import { useState, useEffect } from "react";
import { db } from "../firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";

function OtherUser({user, userDocId, userObj}){

    const [friendRequestButton, setFriendRequestButton] = useState()
    const [otherUser, setOtherUser] = useState(null)

    const otherUserUid = localStorage.getItem('otherUser')

    const fetchUser = async () => {
        try{
            const q = query(collection(db, "users"), where("uid", "==", otherUserUid))
            const querySnapshot = await getDocs(q);

            const userInfo = querySnapshot.docs[0].data()
            const otherUserDocId = querySnapshot.docs[0].id

            setOtherUser(userInfo)

            const userRef = collection(db, "users", userDocId, "friends")
            const docSnap = await getDocs(userRef);

            const uidList = docSnap.docs.map(doc => doc.data().friend_uid)
            
            if(uidList.includes(otherUserUid)){
                console.log('this is a friend')
                setFriendRequestButton(<h1>You and {userInfo.name} are friends</h1>)
            }else{
                console.log('this is not a friend')
                setFriendRequestButton(<button onClick={() => handleAddFriend(otherUserDocId)}>Add Friend</button>)
            }
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }

    const handleAddFriend = async (otherUserDocId) => {
        
        try {
            const q = query(collection(db, "users", otherUserDocId, "friendRequests"))
            const snap = await getDocs(q);
            const list = snap.docs.map(doc => doc.data().senderDocId);

            if(list.includes(userDocId)){
                alert(`You have already sent this user a friend request`)
            }else{
                const reqData = {
                    senderId: user.uid,
                    senderDocId: userDocId,
                    senderName: userObj.name
                }
                await addDoc(collection(db, "users", otherUserDocId, "friendRequests"), reqData)
                alert(`Request sent`)
            }

            
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
    }

    useEffect(() => {
        fetchUser()
    },[])


    const test = () => {
        console.log('test')
        console.log(otherUser)
        console.log(otherUserUid)
        console.log(user)
        console.log(userObj)
    }

    return(
        <div>
            {otherUser ?
            <h1>{otherUser.name}</h1>
            :
            null
            } 
            <button onClick={test}>test</button>
            {friendRequestButton}
        </div>
    )
}

export default OtherUser
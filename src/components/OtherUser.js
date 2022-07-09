import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, addDoc, doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

function OtherUser(){

    const [user, loading, error] = useAuthState(auth);
    const [friendRequestButton, setFriendRequestButton] = useState()
    const [otherUser, setOtherUser] = useState()

    const handleAddFriend = () => {
        console.log("Add friend")
    }

    const otherUserUid = localStorage.getItem('otherUser')

    const fetchUser = async () => {
        const q = query(collection(db, "users"), where("uid", "==", otherUserUid))
        const querySnapshot = await getDocs(q);

        const userInfo = querySnapshot.docs[0].data()

        setOtherUser(userInfo)

        const q2 = query(collection(db, "users"), where("uid", "==", user.uid))
        const querySnapshot2 = await getDocs(q2);

        const docId = querySnapshot2.docs[0].id

        const userRef = collection(db, "users", docId, "friends")
        const docSnap = await getDocs(userRef);

        const uidList = docSnap.docs.map(doc => doc.data().friend_uid)
        
        if(uidList.includes(otherUserUid)){
            console.log('this is a friend')
            setFriendRequestButton(<h1>You and {userInfo.name} are friends</h1>)
        }else{
            console.log('this is not a friend')
            setFriendRequestButton(<button onClick={() => handleAddFriend()}>Add Friend</button>)
        }
    }

    useEffect(() => {
        fetchUser()
    },[])


    const test = () => {
        console.log('test')
        console.log(otherUser)
        console.log(otherUserUid)
    }

    return(
        <div>
            hi
            <button onClick={test}>test</button>
            {friendRequestButton}
        </div>
    )
}

export default OtherUser
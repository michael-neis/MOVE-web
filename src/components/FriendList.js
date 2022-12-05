import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, addDoc, doc, deleteDoc } from "firebase/firestore";

function FriendList({userDocId, userObj}){

    const [requests, setRequests] = useState(null)
    const [friends, setFriends] = useState(null)

    const navigate = useNavigate();

    const findButton = () => {
        navigate('/find_users')
    }

    const addFriend = async (id, data) => {

        const timeAdd = new Date().toLocaleString()

        try {
            const myAddData = {
                friendName: data.senderName,
                friendDocId: data.senderDocId,
                dateAdded: timeAdd
                }
            await addDoc(collection(db, "users", userDocId, "friends"), myAddData).then(function() {
                const otherAddData = {
                    friendName: userObj.name,
                    friendDocId: userDocId,
                    dateAdded: timeAdd
                }
                addDoc(collection(db, "users", data.senderDocId, "friends"), otherAddData).then(function(){
                    deleteDoc(doc(db, "users", userDocId, "friendRequests", id))
                })
                alert("You are now friends")
                setRequests(null)
            })
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
    }

    const denyRequest = async (id) => {
        try{
            await deleteDoc(doc(db, "users", userDocId, "friendRequests", id))
            setRequests(null)
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    const handleAccept = (id, data) => {
        addFriend(id, data)
    }

    const handleDeny = (id) => {
        denyRequest(id)
    }

    const fetchRequests = async () => {
        try {
            const q = query(collection(db, "users", userDocId, "friendRequests"));
            const snap = await getDocs(q);
            const list = snap.docs.map(doc => doc);
            if(list.length > 0){
                const elements = list.map((req) => <li className="req_list" key={req.id}>{req.data().senderName} 
                <button onClick={() => handleAccept(req.id, req.data())}>Accept</button>
                <button onClick={() => handleDeny(req.id)}>Deny</button>
                </li>)
                setFriends(elements);
            }
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
    }

    const fetchFriends = async () => {
        try {
            const q = query(collection(db, "users", userDocId, "friends"));
            const snap = await getDocs(q);
            const list = snap.docs.map(doc => doc);
            if(list.length > 0){
                const elements = list.map((friend) => <li className="friend_list" key={friend.id}>{friend.data().friendName}</li>)
                setRequests(elements);
            }
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
    }

    useEffect(() => {
        if(userDocId){
            fetchRequests()
            fetchFriends()
        }
    }, [userDocId])

    return(
        <div>
            friends here
            <button onClick={findButton}>Find Users</button>
            {requests ? 
            requests
            :
            null}
            {friends ? 
            friends
            :
            null}
        </div>
    )
}

export default FriendList
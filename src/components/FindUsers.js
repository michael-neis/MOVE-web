import { useState } from "react";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, addDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

function FindUsers(){

    const [userText, setUserText] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const navigate = useNavigate();

    const handleUserClick = (user) => {
        localStorage.setItem('otherUser', user.uid)
        navigate('/user')
    }

    const fetchUsers = async () => {
        try {
            const q = query(collection(db, "users"), where("name", "==", userText));
            const snap = await getDocs(q);
            const list = snap.docs.map(doc => doc.data());
            if(list.length > 0){
                const elements = list.map((user) => <li className="user_li" onClick={() => handleUserClick(user)} key={user.email}>{user.name}</li>)
                setSearchResults(elements);
            }else{
                setSearchResults(<li>No Users Found</li>)
            }
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchUsers()
        setUserText('')
    }

    return(
        <>
        <form onSubmit={(e) => {handleSearchSubmit(e)}}>
            <h2>Find Users:</h2>
            <input type="text" id="user_search" value={userText} onChange={(e) => setUserText(e.target.value)}/>
            <button type="submit" id="user_search_submit_btn">Search</button>
        </form>
        {searchResults}
        </>
    )
}

export default FindUsers
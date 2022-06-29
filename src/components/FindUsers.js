import { useState } from "react";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, addDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

function FindUsers(){

    const [userText, setUserText] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const fetchUsers = async () => {
        try {
            const q = query(collection(db, "users"), where("name", "==", userText));
            const snap = await getDocs(q);
            snap.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
            });
            const list = snap.docs.map(doc => doc.data());
            if(list.length > 0){
                const elements = list.map((user) => <li key={user.email}>{user.name}</li>)
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
        console.log(userText)
        fetchUsers()
        setUserText('')
    }

    return(
        <>
        <form onSubmit={(e) => {handleSearchSubmit(e)}}>
            <h2>Find Users:</h2>
            <input type="text" id="user_search" value={userText} onChange={(e) => setUserText(e.target.value)}/>
            <button type="submit" id="user_search_submit_btn">Go</button>
        </form>
        {searchResults}
        </>
    )
}

export default FindUsers
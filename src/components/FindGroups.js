import { useState } from "react";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, addDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

function FindGroups(){

    const [groupText, setGroupText] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const fetchGroups = async () => {
        try {
            const q = query(collection(db, "groups"), where("title", "==", groupText));
            const snap = await getDocs(q);
            const list = snap.docs.map(doc => doc.data());
            if(list.length > 0){
                const elements = list.map((group) => <li key={group.title}>{group.title}</li>)
                setSearchResults(elements);
            }else{
                setSearchResults(<li>No Groups Found</li>)
            }
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching group data");
        }
      };

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchGroups()
        setGroupText('')
    }

    return(
        <>
        <form onSubmit={(e) => {handleSearchSubmit(e)}}>
            <h2>Find Groups:</h2>
            <input type="text" id="group_search" value={groupText} onChange={(e) => setGroupText(e.target.value)}/>
            <button type="submit" id="group_search_submit_btn">Go</button>
        </form>
        {searchResults}
        </>
    )
}

export default FindGroups
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";


function GroupList(){

    const [user, loading, error] = useAuthState(auth);
    const [allGroups, setAllGroups] = useState([])

    const navigate = useNavigate();

    const fetchAllGroups = async () => {
        try {
            const q = query(collection(db, "groups"));
            const snap = await getDocs(q);
            const list = snap.docs.map(doc => doc.data());
            const elements = list.map((group) => <li key={group.title}>{group.title}</li>)
            setAllGroups(elements);
          } catch (err) {
            console.error(err);
            alert("An error occured while fetching move data");
          }
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchAllGroups()
    }, [user, loading]);

    return(
        <div>
            {allGroups}
        </div>
    )
}

export default GroupList
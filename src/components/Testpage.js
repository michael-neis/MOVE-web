import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Testpage(){

    const [user, loading, error] = useAuthState(auth);
    const [moveTitle, setMoveTitle] = useState();
    const [allUsers, setAllUsers] = useState();
    
    const navigate = useNavigate();
    
    const fetchAllUsers = async () => {
        try {
          const q = query(collection(db, "users"));
          const snap = await getDocs(q);
          const list = snap.docs.map(doc => doc.data());
          const elements = list.map((user) => <li key={user.email}>{user.name}, {user.email}</li>)
          setAllUsers(elements);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };
      
      useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchAllUsers();
      }, [user, loading]);


    return(
        <div>
            <h1>Moves list</h1>
            <ul>
                <li>moves here</li>
            </ul>

            <h1>Users list</h1>
            <ul>
                <li>users here</li>
                {allUsers}
            </ul>

            <h1>Create Move</h1>
            <form>
                <input type="text" value={moveTitle} onChange={(e) => setMoveTitle(e.target.value)}/>
            </form>


        <button onClick={() => navigate('/')}>home</button>
        </div>
    )
}

export default Testpage
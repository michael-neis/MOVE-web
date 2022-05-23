import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";

function Testpage(){

    const [user, loading, error] = useAuthState(auth);
    const [moveTitle, setMoveTitle] = useState('');
    const [groupTitle, setGroupTitle] = useState('');
    const [allUsers, setAllUsers] = useState();
    const [allMoves, setAllMoves] = useState()
    
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

    
    const moveClick = (move) => {
        if(move.uid === user.uid){
            console.log('im the admin')
        }else{
            console.log('im not the admin')
        }
    }


    const fetchAllMoves = async () => {
        try {
            const q = query(collection(db, "moves"));
            const snap = await getDocs(q);
            const list = snap.docs.map(doc => doc.data());
            const elements = list.map((move) => <li onClick={() => moveClick(move)} key={move.title}>{move.title}</li>)
            setAllMoves(elements);
          } catch (err) {
            console.error(err);
            alert("An error occured while fetching move data");
          }
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchAllUsers();
        fetchAllMoves()
    }, [user, loading]);

    const createGroup = () => {
        console.log(`creating group: ${groupTitle}`)
        setGroupTitle('')
    }

    const createMove = async () => {
        try {
            const data = {
                uid: user.uid,
                title: moveTitle
                };

            await addDoc(collection(db, "moves"), data);            
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      };


    const moveSubmit = (e) => {
        e.preventDefault()
        createMove()
        setMoveTitle('')
    }


    return(
        <div>
            <h1>Moves list</h1>
            <ul>
                <li>moves here</li>
                {allMoves}
            </ul>

            <h1>Users list</h1>
            <ul>
                <li>users here</li>
                {allUsers}
            </ul>

            <h1>Create Move</h1>
            <form onSubmit={(e) => moveSubmit(e)}>
                <input type="text" value={moveTitle} onChange={(e) => setMoveTitle(e.target.value)}/>
            </form>

            <h1>Create Group</h1>
            <form onSubmit={() => createGroup()}>
                <input type="text" value={groupTitle} onChange={(e) => setGroupTitle(e.target.value)}/>
            </form>


        <button onClick={() => navigate('/')}>home</button>
        </div>
    )
}

export default Testpage
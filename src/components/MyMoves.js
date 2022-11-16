import { useState, useEffect } from "react";
import { db } from "../firebase";
import { query, collection, getDocs } from "firebase/firestore";

function MyMoves({userDocId}){

    const [moves, setMoves] = useState([])

    const fetchMoves = async () => {
        try{
            const q = query(collection(db, "users", userDocId, "myMoves"))
            const snap = await getDocs(q);
            const list = snap.docs.map(doc => doc.data());
            setMoves(list)
            console.log(list)
        }catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }

    }

    useEffect(() => {
        if(userDocId){
            console.log(userDocId)
            fetchMoves();
        }
    }, [userDocId]);


    const handleMoveClick = (move) => {
        console.log(move.moveTitle)
    }


    let displayMoves

    if(!userDocId){
        displayMoves = null
    }else if(moves.length === 0){
        displayMoves = <h1>No Moves Yet</h1>
    }else{
        displayMoves= moves.map((move) => <li className="myMove-li" onClick={() => handleMoveClick(move)} key={move.moveDocId}>{move.moveTitle}</li>)
    }

    return(
        <div>
            <ul>
                {userDocId ? 
                    <div className="myMove-container">
                        {displayMoves}
                    </div>
                 :
                null}
            </ul>
        </div>
    )
}

export default MyMoves
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Move({userDocId}){

    const [move, setMove] = useState(null)

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    })

    const moveDocId = params.m

    const fetchMove = async () => {
        try{
            const q = doc(db, "moves", moveDocId)
            const snap = await getDoc(q);
            const data = snap.data();
            setMove(data)
        }catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }

    useEffect(() => {
        if(moveDocId){
            fetchMove();
        }
    }, [moveDocId]);


    const editMove = () => {
        console.log("editing")
    }


    let displayMove

    if(!move){
        displayMove = null
    }else{
        displayMove = 
        <div>
            <h1>{move.title}</h1>
            <h2>Details: {move.desc}</h2>
            <h3>Move creator: {move.creator}</h3>
            {userDocId === move.creatorDocId ? 
                <button onClick={() => editMove()}>edit</button>
                :
                null
            }
        </div>
    }

    return(
        <>
        {displayMove}
        </>
    )
}

export default Move
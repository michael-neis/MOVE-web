import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import { async } from "@firebase/util";
import { db } from "../firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";

function NewMoveModal({showNewMoveModal, handleCloseNewMove, user, name, userDocId}){

    const [moveTitle, setMoveTitle] = useState('')
    const [moveDesc, setMoveDesc] = useState('')

    const handleTitleChange = (e) => {
        setMoveTitle(e.target.value)
    }

    const handleDescChange = (e) => {
        setMoveDesc(e.target.value)
    }

    const createMove = async () => {
        try {
            const moveData = {
                creatorId: user.uid,
                creatorDocId: userDocId,
                creator: name,
                title: moveTitle,
                desc: moveDesc
                }

            await addDoc(collection(db, "moves"), moveData).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id)
                const userData = {
                    moveDocId: docRef.id,
                    moveTitle: moveTitle
                }
                addDoc(collection(db, "users", userDocId, "myMoves"), userData)
            })
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
    }


    const handleAddMove = (e) =>{
        e.preventDefault()
        createMove()
        console.log(userDocId)
        setMoveTitle("")
        setMoveDesc("")
    }


    return(
    <>
        <Modal show={showNewMoveModal} onHide={handleCloseNewMove}>
            <Modal.Header >
                <Modal.Title>Add a Move</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleAddMove} autoComplete='off'>
                    <label>Title
                        <br/>
                        <input id="moveTitle" type="text" name="moveTitle" value={moveTitle} onChange={handleTitleChange} />
                    </label>
                    <br/>
                    <label> Description
                        <br/>
                        <input id="moveDesc" type="text" name="moveDesc" value={moveDesc} onChange={handleDescChange} />
                    </label>
                    <br/>
                    <button className='nes-btn is-primary' style={{fontSize: 10, marginRight: 10}} type="submit">
                         Add
                    </button>
                </form>
                    <button className='nes-btn is-warning' style={{fontSize: 10}} variant="warning" onClick={handleCloseNewMove}>
                         Cancel
                    </button>
                
            </Modal.Body>
        </Modal>
    </>
    )
}

export default NewMoveModal
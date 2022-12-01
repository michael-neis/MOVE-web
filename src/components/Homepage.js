import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import NewMoveModal from "./NewMoveModal";

function Homepage ({userObj, user, userDocId}) {
   
    const [showNewMoveModal, setShowNewMoveModal] = useState(false)

    const navigate = useNavigate()

    // open and close create move modal
    const handleShowNewMove = () => {
        setShowNewMoveModal(true)
    }
    const handleCloseNewMove = () => {
        setShowNewMoveModal(false)
    }

    return (
        <>
            <Header name={userObj.name}/>
            <div className="dashboard">
                <div className="dashboard__container">
                Logged in as
                <div>{userObj.name}</div>
                <div>{userObj.email}</div>
                </div>
                <button onClick={() => navigate('/test')}>test page</button>
                <button onClick={() => handleShowNewMove()}>new move</button>
                <NewMoveModal showNewMoveModal={showNewMoveModal} handleCloseNewMove={handleCloseNewMove} user={user} name={userObj.name} userDocId={userDocId}/>
            </div>
       </>
    );
}

export default Homepage
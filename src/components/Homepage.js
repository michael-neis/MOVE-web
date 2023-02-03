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

                <div className="homepage-container">
                    <div className="past-moves-container">
                        <h1 className="homepage-headers">Past Moves</h1>
                    </div>

                    <div className="upcoming-moves-container">
                        <h1 className="homepage-headers">Upcoming Moves</h1>
                    </div>
                </div>
                <br/>
                    <div className="friends-looking-container">
                        <h1 className="homepage-headers">Friends Looking for Moves</h1>
                    </div>
                

                <NewMoveModal showNewMoveModal={showNewMoveModal} handleCloseNewMove={handleCloseNewMove} user={user} name={userObj.name} userDocId={userDocId}/>
            </div>
       </>
    );
}

export default Homepage
import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Header from "./Header";
import NewMoveModal from "./NewMoveModal";

function Homepage () {
    const [user, loading, error] = useAuthState(auth)
    const [name, setName] = useState("")
    const [showNewMoveModal, setShowNewMoveModal] = useState(false)
    const [userDocId, setUserDocId] = useState("")

    const navigate = useNavigate()

    // open and close create move modal
    const handleShowNewMove = () => {
        setShowNewMoveModal(true)
    }
    const handleCloseNewMove = () => {
        setShowNewMoveModal(false)
    }

    const fetchUserInfo = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }

      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserDocId(doc.id);
      });
    };
    
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      fetchUserInfo();
    }, [user, loading]);

    return (
        <>
            {/* <Header>
                <h1>MOVE</h1>
            </Header> */}
            <Header user={user} name={name}/>
            <div className="dashboard">
                <div className="dashboard__container">
                Logged in as
                <div>{name}</div>
                <div>{user?.email}</div>
                </div>
                <button onClick={() => navigate('/test')}>test page</button>
                <button onClick={() => handleShowNewMove()}>new move</button>
                <NewMoveModal showNewMoveModal={showNewMoveModal} handleCloseNewMove={handleCloseNewMove} user={user} name={name} userDocId={userDocId}/>
                <ul>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                  <li>hi</li>
                </ul>
            </div>
       </>
    );
}

export default Homepage

// const Header = styled.div`
//     color: ${props => props.theme.color.headers};
//     text-align: center
// `
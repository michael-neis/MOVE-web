import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import FriendList from './FriendList';
import GroupList from './GroupList';
import Testpage from "./Testpage";
import MissingRoute from './MissingRoute';
import Sidebar from "./SideBar";
import FindUsers from "./FindUsers";
import FindGroups from './FindGroups';
import OtherUser from './OtherUser';
import MyMoves from './MyMoves';


function LoggedIn(){

    const [user, loading, error] = useAuthState(auth)
    const [name, setName] = useState("")
    const [userDocId, setUserDocId] = useState("")

    const navigate = useNavigate()

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

    return(
        <div className="logged-in">
        <Sidebar />
        <Routes>
            <Route exact path="/" element={<Homepage user={user} name={name} userDocId={userDocId}/>} />
            <Route exact path="/test" element={<Testpage />} />
            <Route exact path="/friends" element={<FriendList />} />
            <Route exact path="/find_users" element={<FindUsers />} />
            <Route exact path="/groups" element={<GroupList />} />
            <Route exact path="/find_groups" element={<FindGroups />} />
            <Route exact path="/user" element={<OtherUser />} />
            <Route exact path="/myMoves" element={<MyMoves userDocId={userDocId}/>} />
            <Route path="*" element={<MissingRoute />} />
        </Routes>
        </div>
    )
}

export default LoggedIn
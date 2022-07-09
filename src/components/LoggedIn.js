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


function LoggedIn(){


    return(
        <div className="logged-in">
        <Sidebar />
        <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/test" element={<Testpage />} />
            <Route exact path="/friends" element={<FriendList />} />
            <Route exact path="/find_users" element={<FindUsers />} />
            <Route exact path="/groups" element={<GroupList />} />
            <Route exact path="/find_groups" element={<FindGroups />} />
            <Route exact path="/user" element={<OtherUser />} />
            <Route path="*" element={<MissingRoute />} />
        </Routes>
        </div>
    )
}

export default LoggedIn
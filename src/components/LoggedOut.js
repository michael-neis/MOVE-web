import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from './Signup';
import Reset from './Reset'
import MissingRoute from './MissingRoute'


function LoggedOut(){


    return(
        <div className="logged-out">
        <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route path="*" element={<MissingRoute />} />
        </Routes>
        </div>
    )
}

export default LoggedOut
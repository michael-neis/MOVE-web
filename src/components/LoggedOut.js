import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from './Signup'


function LoggedOut(){


    return(
        <div className="logged-out">
        <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
        </Routes>
        </div>
    )
}

export default LoggedOut
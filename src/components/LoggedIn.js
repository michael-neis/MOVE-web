import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";


function LoggedIn(){


    return(
        <div className="logged-in">
        <Routes>
            <Route path='/' element={<Homepage />}/>
        </Routes>
        </div>
    )
}

export default LoggedIn
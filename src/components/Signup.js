import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../firebase";

function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useNavigate();
    const register = () => {
      if (!name) alert("Please enter name");
      registerWithEmailAndPassword(name, email, password);
    };
    
    useEffect(() => {
    //   if (loading){
    //       return(
    //           <h1>Loading...</h1>
    //       )
    //     }
      if (user){
          history("/");
        }
    }, [user, loading]);

    const handleSubmit = (e) => {
      e.preventDefault();

      if(password === verifyPassword){
        register()
      }else{
        alert("Password must match")
      }
    }


    return (
      <div className="register">
        <div className="register__container">
          <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            className="register__textBox"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            placeholder="Verify Password"
          />
          <button className="register__btn" 
            type='submit'
          >
            Register
          </button>
          </form>
          <button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            Register with Google
          </button>
          <div>
            Already have an account? <Link to="/login">Login</Link> now.
          </div>
        </div>
      </div>
    );
}

export default Signup
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Reset from './components/Reset';
import Homepage from './components/Homepage';
import FriendList from './components/FriendList';
import GroupList from './components/GroupList';
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';
import { ThemeProvider } from 'styled-components'
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route } from "react-router-dom";
import Testpage from "./components/Testpage";

function App() {

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return(
      <h1>Loading...</h1>
    );
  }

  return (
    <div className='main'>
    <ThemeProvider theme={theme}>
      {/* <Routes>
        <Route exact path="/" element={user ? <Homepage /> : <LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/test" element={<Testpage />} />
        <Route exact path="/friends" element={<FriendList />} />
        <Route exact path="/groups" element={<GroupList />} />
      </Routes> */}
      {user ? (<LoggedIn />) : (<LoggedOut />)}
    </ThemeProvider>
    </div>
  );
}

export default App;

const theme={
  color: {
    headers: "rgb(255, 72, 0)"
  },
  backgroundColor: {
    headers: "hsl(210, 50%, 20%)"
  }
}
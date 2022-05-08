import './App.css';
import LandingPage from './components/LandingPage';
import Homepage from './components/Homepage'
import { ThemeProvider } from 'styled-components'

function App() {
  return (
    <>
      <Homepage/>
    </>
  );
}

export default App;

const theme={
  color: {
    headers: "hsl(30, 100%, 80%)"
  },
  backgroundColor: {
    headers: "hsl(210, 50%, 20%)"
  }
}
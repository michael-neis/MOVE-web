import './App.css';
import LandingPage from './components/LandingPage';
import Homepage from './components/Homepage'
import { ThemeProvider } from 'styled-components'

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Homepage/>
    </ThemeProvider>
    </>
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
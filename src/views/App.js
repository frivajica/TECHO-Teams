import { Routes, Route } from "react-router-dom"
import Navbar from "../commons/navbar/Navbar"
import Footer from "../commons/footer/Footer"
import Home from "../components/home/Home"
import { ThemeProvider } from '@mui/material/styles';
import theme from "./themeConfig"
 
function App() {
  return (
    <div>
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </ThemeProvider>
    </div>
  );
}

export default App;

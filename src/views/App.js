import { Routes, Route } from "react-router-dom"
import Navbar from "../commons/navbar/Navbar"
import Footer from "../commons/footer/Footer"
import Home from "../components/home/Home"
 
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

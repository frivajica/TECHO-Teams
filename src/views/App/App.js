import { Routes, Route } from "react-router-dom";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import Home from "../../components/home/Home";
import SignUp from "../../components/completarSignUp/SignUp";
import Register from "../../components/Register/Register"
function App() {
  return (
    <div>
      <Navbar />
      <div className='content'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/joaquin" element={<SignUp />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

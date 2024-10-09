// import './App.css';

import NavBar from "./components/inc/Navbar";
import Footer from "./components/inc/Footer";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
//import AdminLogin from './components/pages/AdminLogin';
import Login from "./components/pages/Login";
import Signup from "./components/pages/SignUp";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import DriverDashboard from "./components/driver/DriverDashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customerdashboard" element={<CustomerDashboard />} />
          <Route path="/driverdashboard" element={<DriverDashboard />} />
          <Route path="/Managerdashboard" element={<ManagerDashboard />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

// import './App.css';

import NavBar from "./components/inc/Navbar";
import Footer from "./components/inc/Footer";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
//import AdminLogin from './components/pages/AdminLogin';
import Login from "./components/pages/Login";
import Signup from "./components/pages/SignUp";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import TrainSchedule from "./components/manager/TrainSchedule";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import DriverDashboard from "./components/driver/DriverDashboard";
import ProductList from "./components/customer/products";
import Tracking from "./components/customer/Tracking";

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
          <Route path="/trainschedule" element={<TrainSchedule />} />
          <Route path="/order-products" element={<ProductList />} />
          <Route path="/track-orders" element={<Tracking />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

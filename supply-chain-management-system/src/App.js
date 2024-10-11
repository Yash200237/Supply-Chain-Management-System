// import './App.css';

import NavBar from "./components/inc/Navbar";
import Footer from "./components/inc/Footer";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import ManagerLogin from "./components/pages/ManagerLogin";
import CustomerLogin from "./components/pages/CustomerLogin";
import DriverLogin from "./components/pages/DriverLogin";
import Start from "./components/pages/Start";
import Signup from "./components/pages/SignUp";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import TrainSchedule from "./components/manager/TrainSchedule";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import DriverDashboard from "./components/driver/DriverDashboard";
import ProductList from "./components/customer/products";
import Tracking from "./components/customer/Tracking";
import Registration from "./components/manager/Registration";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/start/customerlogin" element={<CustomerLogin />} />
          <Route path="/start/managerlogin" element={<ManagerLogin />} />
          <Route path="/start/driverlogin" element={<DriverLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customerdashboard" element={<CustomerDashboard />} />
          <Route path="/driverdashboard" element={<DriverDashboard />} />
          <Route path="/managerdashboard" element={<ManagerDashboard />} />
          <Route path="/trainschedule" element={<TrainSchedule />} />
          <Route path="/order-products" element={<ProductList />} />
          <Route path="/track-orders" element={<Tracking />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

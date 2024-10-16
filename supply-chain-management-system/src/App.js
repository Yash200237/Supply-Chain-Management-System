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
import TrainSchedual from './components/manager/TrainSchedual'
import ManagerDashboard from "./components/manager/ManagerDashboard";
import DriverDashboard from "./components/driver/DriverDashboard";
import Tracking from "./components/customer/Tracking";
import Registration from "./components/manager/Registration";
import Cart from "./components/customer/Cart";
import PendingOrders from './components/manager/PendingOrders';
import OrderPreview from './components/manager/OrderPreview';
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
          <Route path='/customerdashboard' element={<CustomerDashboard/>} />
          <Route path='/driverdashboard' element={<DriverDashboard/>} />
          <Route path='/Managerdashboard' element={<ManagerDashboard/>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

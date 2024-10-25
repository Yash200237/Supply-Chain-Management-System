// import './App.css';

import NavBar from "./components/inc/Navbar";
import Footer from "./components/inc/Footer";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import ManagerLogin from "./components/pages/ManagerLogin";
import CustomerLogin from "./components/pages/CustomerLogin";
import DriverLogin from "./components/pages/DriverLogin";
import Signup from "./components/pages/SignUp";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import TrainSchedule from "./components/manager/TrainSchedule";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import DriverDashboard from "./components/driver/DriverDashboard";
import ProductList from "./components/customer/products";
import Tracking from "./components/customer/Tracking";
import Registration from "./components/manager/Registration";
import Cart from "./components/customer/Cart";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customerlogin" element={<CustomerLogin />} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
          <Route path="/driverlogin" element={<DriverLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customerdashboard" element={<CustomerDashboard />} />
          <Route path="/driverdashboard" element={<DriverDashboard />} />
          <Route path="/managerdashboard" element={<ManagerDashboard />} />
          <Route path="/trainschedule" element={<TrainSchedule />} />
          <Route path="/order-products" element={<ProductList />} />
          <Route
            path="/track-orders/:customer_ID"
            element={<Tracking />}
          />{" "}
          {/* Updated route */}
          <Route path="/registration" element={<Registration />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

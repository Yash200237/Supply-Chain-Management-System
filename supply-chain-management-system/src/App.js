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
import TruckSchedule from "./components/manager/TruckSchedule";
import Reports from "./components/manager/reports/Reports";
import QuarterlySalesReport from "./components/manager/reports/QuarterlySalesReport";
import ItemsMostOrdersReport from "./components/manager/reports/ItemsMostOrdersReport";
import SalesByCityRouteReport from "./components/manager/reports/SalesByCityRouteReport";
import WorkingHoursReport from "./components/manager/reports/WorkingHoursReport";
import CustomerOrderReport from "./components/manager/reports/CustomerOrderReport";
import DriverWorkingHoursReport from "./components/manager/reports/workinghours/DriverWorkingHoursReport";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DriverAssistantWorkingHoursReport from "./components/manager/reports/workinghours/DriverAWorkingHoursReport";
import TruckWorkingHoursReport from "./components/manager/reports/workinghours/TruckWorkingHoursReport";

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
          <Route path="/truckschedule" element={<TruckSchedule />} />
          <Route
            path="/track-orders/:customer_ID"
            element={<Tracking />}
          />{" "}
          {/* Updated route */}
          <Route path="/registration" element={<Registration />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/quarterly-sales-report"
            element={<QuarterlySalesReport />}
          />
          <Route
            path="/items-most-orders"
            element={<ItemsMostOrdersReport />}
          />
          <Route
            path="/sales-by-city-route"
            element={<SalesByCityRouteReport />}
          />
          <Route path="/working-hours" element={<WorkingHoursReport />} />
          <Route path="/working-hours/driverworkinghours" element={<DriverWorkingHoursReport />} />
          <Route path="/working-hours/driverassistantworkinghours" element={<DriverAssistantWorkingHoursReport />} />
          <Route path="/working-hours/truckworkinghours" element={<TruckWorkingHoursReport />} />

          <Route
            path="/customer-order-report"
            element={<CustomerOrderReport />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

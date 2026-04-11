import { BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Header from "./components/Header";
import EditProduct from "./pages/editProduct";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import Designation from "./pages/Designation";

import Employees from "./pages/Employees";
import EditEmployees from "./pages/EditEmployees";

import Vendors from "./pages/Vendors";
// for edit distributor
import EditVendor from "./pages/EditVendor";

import EditDesignation from "./pages/EditDesignation";
// customers page
import Customers from "./pages/Customers";
import EditCustomer from "./pages/EditCustomer";
// login page 
import Login from "./pages/Login";
// protected
import ProtectedRoute from "./components/ProtectRoute";
// purchase
import PurchaseOrder from "./pages/PurchaseOrder";
import PurchaseLines from "./pages/PurchaseLines";
// sales
import SaleOrder from "./pages/SaleOrder";
import SaleLine from "./pages/SaleLine";



function App() {
  return (
    <BrowserRouter>
      

      <Routes>
        {/* public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* protected route */}

        <Route element={<ProtectedRoute />} >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />

          <Route path="/designations" element={<Designation />} />
          <Route path="/designations/edit/:id" element={<EditDesignation />} />

          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/edit/:id" element={<EditEmployees />} />

          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/edit/:id" element={<EditVendor />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/edit/:id" element={<EditCustomer />} />

          {/* purchase pages path */}
          <Route path="/purchase-order" element={<PurchaseOrder />} />
          <Route path="/purchase-lines/:id" element={<PurchaseLines />} />

          {/* react route for the sale pages */}
          <Route path="/sale-order" element={<SaleOrder />} />
          <Route path="/sales-lines/:id" element={<SaleLine />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
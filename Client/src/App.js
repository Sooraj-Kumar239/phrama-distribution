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
import Vendors from "./pages/Vendors";
// for edit distributor
import EditVendor from "./pages/EditVendor";

import EditDesignation from "./pages/EditDesignation";
// customers page
import Customers from "./pages/Customers";
import EditCustomer from "./pages/EditCustomer";
// login page 
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/edit/:id" element={<Users />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        <Route path="/designations" element={<Designation/>}/>
        <Route path="/employees" element={<Employees/>}/>
       
        <Route path="/edit-designation/:id" element={<EditDesignation />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/edit/:id" element={<EditVendor />} />
        {/* for edit  */}
        {/* customers  */}
        <Route path="/customers" element={< Customers />}/>
        <Route path="/customers/edit/:id" element={<EditCustomer/>} />
        {/* login page */}
        <Route path="/login" element={<Login />} />
      
      </Routes>

    </BrowserRouter>
  );
}

export default App;
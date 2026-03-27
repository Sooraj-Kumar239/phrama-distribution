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

import EditDesignation from "./pages/EditDesignation";


function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/edit/:id" element={<Users />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        <Route path="/designations" element={<Designation/>}/>
        <Route path="/employees" element={<Employees/>}/>
       
        <Route path="/edit-designation/:id" element={<EditDesignation />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
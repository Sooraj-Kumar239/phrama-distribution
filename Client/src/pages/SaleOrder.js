import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../config";


const user = JSON.parse(localStorage.getItem("user"));

function SaleOrder() {
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({});
    const [employees, setEmployees] = useState([]);
    // customers list dropdowm m
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const navigate = useNavigate();

    // FORMAT ID(000001)
    const formatID = (id) => String(id).padStart(6, "0");
    
    // vehicles api start
    useEffect(() => {
        fetch(`${API_BASE_URL}/sales-orders`)     
        .then(res => res.json())
        .then(data => setOrders(data));

        fetch(`${API_BASE_URL}/api/customers`)
        .then(res => res.json())
        .then(data => setCustomers(data));

        fetch(`${API_BASE_URL}/vehicles`)
            .then(res => res.json())
            .then(data => setVehicles(data));

        fetch(`${API_BASE_URL}/employees`)
            .then(res => res.json())
            .then(data => setEmployees(data));    
    }, []);
    
  // SELECT ROW on click
  const handleRowClick = (o) => {
    setSelected(o.SalesOrderID);
  };

  // ID CLICK -> NAVIGATE ->to SaleLinie page
  const handleIDClick = (e, id) => {
    e.stopPropagation();
    navigate(`/sales-lines/${id}`);
  };

  // LINES BUTTON click p lines page p jawhi
  const goToLines = () => {
    if (!selected) return toast.info("Select record first");
    navigate(`/sales-lines/${selected}`);
  };

  // ADD new record
  const handleAdd = () => {
        setTempData({
        CustomerID      : "",
        EmployeeID      : user?.EmployeeID || "",
        VehicleID       : "",
        OrderDate       :"new Date().toISOString().split('T')[0],",
        TotalAmount     :0,
        DeliveryStatus  :"Processing",
        PaymentStatus   :"Unpaid"
    });
        setEditMode(true);
        // to identify new record
        setSelected("new");
    };

  // EDIT
    const handleEdit = () => {
        if (!selected || selected === "new") return toast.info("Select record first");

        const current = orders.find(o => o.SalesOrderID === selected);
        // ab selected data nu load kr form m
        setTempData(current);
        setEditMode(true);
    };

    // Change inputt
    const handleChange = (field, value) => {
        setTempData({ ...tempData, [field]: value });
    };

  // SAVE inser / update
   const handleSave = () => {
    const isNew = selected === "new";
    const url = isNew ? `${API_BASE_URL}/sales-orders` : `${API_BASE_URL}/sales-orders/${selected}`;
    const method = isNew ? "POST" : "PUT"; // Naya record hai to POST, purana hai to PUT

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempData)
    })
    .then(() => {
        toast.info(isNew ? "Created!" : "Updated Successfully!");
        window.location.reload();
    });
};
  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Sales Orders</h2>

        {/* BUTTONS */}
        <div style={{ marginBottom: "15px" }}>
          <button style={btnGreen} onClick={handleAdd}>+ Add</button>
          <button style={btnYellow} onClick={handleEdit}>Edit</button>
          <button style={btnBlue} onClick={handleSave}>Save</button>
          <button style={btnDark} onClick={goToLines}>Lines</button>
        </div>

        {/* TABLE CONTAINER */}
        <div style={tableContainer}>
          {/* HEADER - Exact order of your table */}
          <div style={tableHeader}>
            <div>ID</div>
            <div>Customer</div>
            <div>Employee</div>
            <div>Vehicle</div>
            <div>Order Date</div>
            <div>Total Amount</div>
            <div>Delivery</div>
            <div>Payment</div>
          </div>

          {/* ADD NEW ROW INPUTS */}
          {editMode && selected === "new" && (
            <div style={tableRow}>
              <div>Auto</div>
              <select value={tempData.CustomerID} onChange={(e) => handleChange("CustomerID", e.target.value)}>
                <option value="">Select Customer</option>
                {customers.map((c) => (<option key={c.CustomerID} value={c.CustomerID}>{c.CustomerName}</option>))}
              </select>
             
              <div>{user?.EmployeeID || "N/A"}</div>
              <select value={tempData.VehicleID} onChange={(e) => handleChange("VehicleID", e.target.value)}>
                <option value="">Select Vehicle</option>
                {vehicles.map((v) =>(
                    <option key={v.VehicleID} value={v.VehicleID}>
                        {v.VehicleNumber || v.PlateNumber || v.VehicleID}
                    </option>))}
              </select>
              <input type="date" value={tempData.OrderDate} onChange={(e) => handleChange("OrderDate", e.target.value)} />
              <input type="number" value={tempData.TotalAmount} onChange={(e) => handleChange("TotalAmount", e.target.value)} />
              <select value={tempData.DeliveryStatus} onChange={(e) => handleChange("DeliveryStatus", e.target.value)}>
                <option>Processing</option><option>Shipped</option><option>Delivered</option><option>Returned</option>
              </select>
              <select value={tempData.PaymentStatus} onChange={(e) => handleChange("PaymentStatus", e.target.value)}>
                <option>Unpaid</option><option>Partially Paid</option><option>Paid</option>
              </select>
            </div>
          )}

          {/* DATA ROWS */}
          {orders.map((o) => (
            <div
              key={o.SalesOrderID}
              style={{ ...tableRow, backgroundColor: selected === o.SalesOrderID ? "#e7f1ff" : "white" }}
              onClick={() => handleRowClick(o)}
            >
              {/* 1. SalesOrderID */}
              <div style={cellLink} onClick={(e) => handleIDClick(e, o.SalesOrderID)}>
                {formatID(o.SalesOrderID)}
              </div>

              {/* 2. CustomerID (Display Name) */}
              <div>
                {editMode && selected === o.SalesOrderID ? (
                  <select value={tempData.CustomerID} onChange={(e) => handleChange("CustomerID", e.target.value)}>
                    {customers.map((c) => (<option key={c.CustomerID} value={c.CustomerID}>{c.CustomerName}</option>))}
                  </select>
                ) : (
                  customers.find((c) => Number(c.CustomerID) === Number(o.CustomerID))?.CustomerName || o.CustomerID
                )}
              </div>

              {/* 3. EmployeeID */}
                <div>
 
                    {employees.find((emp) => Number(emp.EmployeeID) === Number(o.EmployeeID))?.EmployeeName || o.EmployeeID}
                </div>

              {/* 4. VehicleID */}
            <div>
                {editMode && selected === o.SalesOrderID ? (
                    <select value={tempData.VehicleID} onChange={(e) => handleChange("VehicleID", e.target.value)}>
                        {vehicles.map((v) => (
                            <option key={v.VehicleID} value={v.VehicleID}>
                                {v.VehicleNumber || v.PlateNumber || v.VehicleID}
                            </option>
                         ))}
                    </select>
                ) : (
                vehicles.find((v) => Number(v.VehicleID) === Number(o.VehicleID))?.VehicleNumber || 
                vehicles.find((v) => Number(v.VehicleID) === Number(o.VehicleID))?.PlateNumber || 
                o.VehicleID
                )}
            </div>


              {/* 5. OrderDate */}
              <div>{new Date(o.OrderDate).toLocaleDateString()}</div>

              {/* 6. TotalAmount */}
              <div>{Number(o.TotalAmount).toFixed(2)}</div>

              {/* 7. DeliveryStatus */}
              <div>
                {editMode && selected === o.SalesOrderID ? (
                  <select value={tempData.DeliveryStatus} onChange={(e) => handleChange("DeliveryStatus", e.target.value)}>
                    <option>Processing</option><option>Shipped</option><option>Delivered</option><option>Returned</option>
                  </select>
                ) : o.DeliveryStatus}
              </div>

              {/* 8. PaymentStatus */}
              <div>
                {editMode && selected === o.SalesOrderID ? (
                  <select value={tempData.PaymentStatus} onChange={(e) => handleChange("PaymentStatus", e.target.value)}>
                    <option>Unpaid</option><option>Partially Paid</option><option>Paid</option>
                  </select>
                ) : o.PaymentStatus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

// --- CSS STYLES ---
const tableContainer = { borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" };
const tableHeader = {
  display: "grid",
  gridTemplateColumns: "0.6fr 1.2fr 1fr 1fr 1fr 0.8fr 1fr 1fr",
  backgroundColor: "#343a40",
  color: "white",
  padding: "12px",
  fontWeight: "600",
  fontSize: "14px"
};
const tableRow = {
  display: "grid",
  gridTemplateColumns: "0.6fr 1.2fr 1fr 1fr 1fr 0.8fr 1fr 1fr",
  padding: "12px",
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
  alignItems: "center",
  fontSize: "14px"
};
const cellLink = { color: "#0d6efd", textDecoration: "underline", cursor: "pointer", fontWeight: "bold" };
const btnGreen = { backgroundColor: "#28a745", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", marginRight: "8px", cursor: "pointer" };
const btnYellow = { backgroundColor: "#ffc107", border: "none", padding: "8px 14px", borderRadius: "6px", marginRight: "8px", cursor: "pointer" };
const btnBlue = { backgroundColor: "#007bff", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", marginRight: "8px", cursor: "pointer" };
const btnDark = { backgroundColor: "#343a40", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", cursor: "pointer" };

export default SaleOrder;
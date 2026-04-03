import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function SalesOrder() {

  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({});

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const navigate = useNavigate();

  const formatID = (id) => String(id).padStart(6, "0");

  // LOAD DATA (PROFESSIONAL - single useEffect)
  useEffect(() => {
    fetch("http://localhost:3003/sales-orders")
      .then(res => res.json())
      .then(data => setOrders(data));

    fetch("http://localhost:3003/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));

    fetch("http://localhost:3003/vehicles")
      .then(res => res.json())
      .then(data => setVehicles(data));

  }, []);

  const handleRowClick = (o) => {
    setSelected(o.SalesOrderID);
  };

  const handleIDClick = (e, id) => {
    e.stopPropagation();
    navigate(`/sales-lines/${id}`);
  };

  const goToLines = () => {
    if (!selected) return alert("Select record first");
    navigate(`/sales-lines/${selected}`);
  };

  // ADD
  const handleAdd = () => {
    setTempData({
      CustomerID: "",
      VehicleID: "",
      EmployeeID: 1,
      OrderDate: "",
      TotalAmount: 0,
      DeliveryStatus: "Pending",
      PaymentStatus: "Unpaid"
    });
    setEditMode(true);
    setSelected("new");
  };

  // EDIT
  const handleEdit = () => {
    if (!selected || selected === "new") return alert("Select record first");
    const current = orders.find(o => o.SalesOrderID === selected);
    setTempData(current);
    setEditMode(true);
  };

  const handleChange = (field, value) => {
    setTempData({ ...tempData, [field]: value });
  };

  // SAVE
  const handleSave = () => {

    if (selected === "new") {
      fetch("http://localhost:3003/sales-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempData)
      })
      .then(res => res.json())
      .then(() => {
        alert("Inserted!");
        window.location.reload();
      });

    } else {
      fetch(`http://localhost:3003/sales-orders/${selected}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempData)
      })
      .then(() => {
        alert("Updated!");
        window.location.reload();
      });
    }
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

        {/* TABLE */}
        <div style={tableContainer}>

          <div style={tableHeader}>
            <div>ID</div>
            <div>Customer</div>
            <div>Vehicle</div>
            <div>Total</div>
            <div>Status</div>
          </div>

          {/* ADD ROW */}
          {editMode && selected === "new" && (
            <div style={tableRow}>
              <div>Auto</div>

              {/* CUSTOMER */}
              <select
                value={tempData.CustomerID || ""}
                onChange={(e) => handleChange("CustomerID", e.target.value)}
              >
                <option value="">Select Customer</option>
                {customers.map(c => (
                  <option key={c.CustomerID} value={c.CustomerID}>
                    {c.CustomerName}
                  </option>
                ))}
              </select>

              {/* VEHICLE */}
              <select
                value={tempData.VehicleID || ""}
                onChange={(e) => handleChange("VehicleID", e.target.value)}
              >
                <option value="">Select Vehicle</option>
                {vehicles.map(v => (
                  <option key={v.VehicleID} value={v.VehicleID}>
                    {v.PlateNumber}
                  </option>
                ))}
              </select>

              <input
                placeholder="Total"
                value={tempData.TotalAmount || ""}
                onChange={(e) => handleChange("TotalAmount", e.target.value)}
              />

              <select
                value={tempData.DeliveryStatus}
                onChange={(e) => handleChange("DeliveryStatus", e.target.value)}
              >
                <option>Pending</option>
                <option>Delivered</option>
              </select>
            </div>
          )}

          {/* ROWS */}
          {orders.map((o) => (
            <div
              key={o.SalesOrderID}
              style={{
                ...tableRow,
                backgroundColor: selected === o.SalesOrderID ? "#e7f1ff" : "white"
              }}
              onClick={() => handleRowClick(o)}
            >

              <div style={cellLink} onClick={(e) => handleIDClick(e, o.SalesOrderID)}>
                {formatID(o.SalesOrderID)}
              </div>

              {/* CUSTOMER */}
              <div>
                {customers.find(c => c.CustomerID === o.CustomerID)?.CustomerName || o.CustomerID}
              </div>

              {/* VEHICLE */}
              <div>
                {vehicles.find(v => v.VehicleID === o.VehicleID)?.PlateNumber || o.VehicleID}
              </div>

              <div>{o.TotalAmount}</div>
              <div>{o.DeliveryStatus}</div>

            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default SalesOrder;
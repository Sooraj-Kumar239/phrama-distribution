import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function PurchaseOrder() {

  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({});
  const [vendors, setVendors] = useState([]);

  const navigate = useNavigate();

  // FORMAT ID
  const formatID = (id) => String(id).padStart(6, "0");

  // LOAD DATA
  useEffect(() => {
    fetch("http://localhost:3003/purchase-orders")
      .then(res => res.json())
      .then(data => setOrders(data));
    }, []);

   useEffect(() => {
        fetch("http://localhost:3003/vendors")
        .then(res => res.json())
        .then(data => setVendors(data));

    }, []);

  // SELECT ROW
  const handleRowClick = (o) => {
    setSelected(o.PurchaseOrderID);
  };

  // ID CLICK → NAVIGATE
  const handleIDClick = (e, id) => {
    e.stopPropagation();
    navigate(`/purchase-lines/${id}`);
  };

  // LINES BUTTON
  const goToLines = () => {
    if (!selected) return alert("Select record first");
    navigate(`/purchase-lines/${selected}`);
  };

  // ADD
  const handleAdd = () => {
    setTempData({
      OrderName: "",
      VendorID: "",
      OrderStatus: "Pending",
      EmployeeID: 1
    });
    setEditMode(true);
    setSelected("new");
  };

  // EDIT
  const handleEdit = () => {
    if (!selected || selected === "new") return alert("Select record first");
    const current = orders.find(o => o.PurchaseOrderID === selected);
    setTempData(current);
    setEditMode(true);
  };

  // CHANGE
    const handleChange = (field, value) => {
    setTempData({ ...tempData, [field]: value });
  };

  // SAVE
  const handleSave = () => {

    if (selected === "new") {
      // INSERT
      fetch("http://localhost:3003/purchase-orders", {
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
      // UPDATE
      fetch(`http://localhost:3003/purchase-orders/${selected}`, {
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

        <h2>Purchase Orders</h2>

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
            <div>Name</div>
            <div>Vendor</div>
            <div>Status</div>
            <div>Created By</div>
          </div>

          {editMode && selected === "new" && (
            <div style={tableRow}>
              <div>Auto</div>

              <input
                placeholder="Name"
                value={tempData.OrderName || ""}
                onChange={(e) => handleChange("OrderName", e.target.value)}
              />

                <select
                    value={tempData.VendorID || ""}
                    onChange={(e) => handleChange("VendorID", e.target.value)}
                >
                    <option value="">Select Vendor</option>
                        
                         {vendors.map(v => (
                    <option key={v.VendorID} value={v.VendorID}>
                        {v.VendorName}
                    </option>
                 ))}
                
              </select>

              <select
                value={tempData.OrderStatus}
                onChange={(e) => handleChange("OrderStatus", e.target.value)}
              >
                <option>Pending</option>
                <option>Received</option>
              </select>

              <div>1</div>
            </div>
          )}

          {orders.map((o) => (
            <div
              key={o.PurchaseOrderID}
              style={{
                ...tableRow,
                backgroundColor: selected === o.PurchaseOrderID ? "#e7f1ff" : "white"
              }}
              onClick={() => handleRowClick(o)}
            >

              {/* ID */}
              <div style={cellLink} onClick={(e) => handleIDClick(e, o.PurchaseOrderID)}>
                {formatID(o.PurchaseOrderID)}
              </div>

              {/* NAME */}
              <div>
                {editMode && selected === o.PurchaseOrderID ? (
                  <input
                    value={tempData.OrderName || ""}
                    onChange={(e) => handleChange("OrderName", e.target.value)}
                  />
                ) : (
                  o.OrderName
                )}
              </div>

              {/* VENDOR */}
              <div>
                {editMode && selected === o.PurchaseOrderID ? (
                  <select
                    value={tempData.VendorID || ""}
                    onChange={(e) => handleChange("VendorID", e.target.value)}
                  >
                    {vendors.map(v => (
                    <option key={v.VendorID} value={v.VendorID}>
                        {v.VendorName}
                    </option>
                    ))}
                  </select>
                ) : (
                  vendors.find(v => v.VendorID === o.VendorID)?.VendorName || o.VendorID
                )}
              </div>

              {/* STATUS */}
              <div>
                {editMode && selected === o.PurchaseOrderID ? (
                  <select
                    value={tempData.OrderStatus || ""}
                    onChange={(e) => handleChange("OrderStatus", e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Received</option>
                  </select>
                ) : (
                  o.OrderStatus
                )}
              </div>

              <div>{o.EmployeeID}</div>

            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

//////////////// STYLES //////////////////

const tableContainer = {
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const tableHeader = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  backgroundColor: "#343a40",
  color: "white",
  padding: "12px",
  fontWeight: "600"
};

const tableRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  padding: "12px",
  borderBottom: "1px solid #ddd",
  cursor: "pointer"
};

const cellLink = {
  color: "#0d6efd",
  textDecoration: "underline",
  cursor: "pointer"
};

const inputStyle = {
  padding: "5px",
  width: "80%",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const btnGreen = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  marginRight: "8px",
  cursor: "pointer"
};

const btnYellow = {
  backgroundColor: "#ffc107",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  marginRight: "8px",
  cursor: "pointer"
};

const btnBlue = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  marginRight: "8px",
  cursor: "pointer"
};

const btnDark = {
  backgroundColor: "#343a40",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

export default PurchaseOrder;
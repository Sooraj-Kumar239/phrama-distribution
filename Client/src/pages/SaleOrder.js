import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";


function SaleOrder() {

    // ha jako login hui ochi ID pick karhi automatic
    const user = JSON.parse(localStorage.getItem("user"));
    // kul sale order aahy DB moon
  const [orders, setOrders] = useState([]);
    //   selected row chti awhi edit krry la
  const [selected, setSelected] = useState(null);
    //   edit mode on off
  const [editMode, setEditMode] = useState(false);
    //   temporary / aaarzi data form m
  const [tempData, setTempData] = useState({});
    // customers list dropdowm m
  const [customers, setCustomers] = useState([]);
    //   state for vehicles
    const [vehicles, setVehicles] = useState([]);

  const navigate = useNavigate();

  // FORMAT ID(000001)
  const formatID = (id) => String(id).padStart(6, "0");
    // vehicles api start
    useEffect(() => {
        fetch("http://localhost:3003/vehicles")
            .then(res => res.json())
            .then(data => setVehicles(data));
    }, []);
    // vehicels api end
    // LOAD sale orders
    useEffect(() => {
        fetch("http://localhost:3003/sales-orders")     
        .then(res => res.json())
        .then(data => setOrders(data));
    }, []);
        // all customer dropdown
   useEffect(() => {
        fetch("http://localhost:3003/customers")
        .then(res => res.json())
        .then(data => setCustomers(data));

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
    if (!selected) return alert("Select record first");
    navigate(`/sales-lines/${selected}`);
  };

  // ADD new record
  const handleAdd = () => {
        setTempData({
        CustomerID      : "",
        EmployeeID      : user?.EmployeeID,
        VehicleID       : "",
        OrderDate       :"",
        TotalAmount     :"",
        DeliveryStatus  :"",
        PaymentStatus   :""
    });
        setEditMode(true);
        // to identify new record
        setSelected("new");
    };

  // EDIT
  const handleEdit = () => {
        if (!selected || selected === "new") return alert("Select record first");

        const current = orders.find(o => o.SaleOrderID === selected);
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

        if (selected === "new") {
            // Insert
            fetch("http://localhost:3003/sales-orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.error){
                    alert("error: " + data.error);
                }
                else
                {
                    alert("Inserted!");
                    window.location.reload();    
                }
            })
           
            .catch(err => {
                console.error(err);
                alert("Server error");
            });
        }
         else {
            // UPDATE
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

                <h2>sale Orders</h2>

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
                            <div>Sale Order ID</div>
                            <div>Customer ID/Name</div>
                            <div>Employee ID/Name</div>
                            <div>Vehicle ID</div>
                            <div>Order Date</div>
                            <div>Total Amount</div>
                            <div>Delivery Status</div>
                            <div>Payment Status</div>
                    </div>
                            
                    {/* add new row */}
                    {editMode && selected === "new" && (
                        <div style={tableRow}>
                            <div>Auto</div>
                            {/* customers */}
                            <select
                                value={tempData.CustomerID|| ""}
                                onChange={(e) => handleChange("CustomerID", e.target.value)}
                                >
                                <option value="">Select Customer</option>
                                {customers.map(c => (
                                    <option key={c.CustomerID} value={c.CustomerID}>
                                        {c.CustomerName}
                                    </option>
                                ))}
                            </select>
                            
                            <div>{user?.EmployeeID}</div>

                            {/* vehicle */}
                            <select
                                value={tempData.VehicleID || ""}
                                onChange={(e) => handleChange("VehicleID", e.target.value)}
                                >
                                <option value="">Vehicle</option>
                                {vehicles.map(v => (
                                    <option key={v.VehicleID} value={v.VehicleID}>
                                        {v.Model}
                                    </option>
                                ) )}    
                            </select> 
                            {/* <input
                                placeholder="Vehicle"
                                value={tempData.VehicleID}
                                onChange={(e) => handleChange("VehicleID", e.target.value)}
                            /> */}

                            {/* order date */}
                            <input
                                type="date"
                                value={tempData.OrderDate}
                                onChange={(e) => handleChange("OrderDate", e.target.value)}
                            />

                            {/* total amount */}
                            <input
                                placeholder="Total"
                                value={tempData.TotalAmount}
                                onChange={(e) => handleChange("TotalAmount", e.target.value)}
                          />

                            {/* deleviery status */}
                            <input
                                placeholder="Delivery"
                                value={tempData.DeliveryStatus}
                                onChange={(e) => handleChange("DeliveryStatus", e.target.value)}
                            />

                            {/* peyment status */}
                            <input
                                placeholder="Payment"
                                value={tempData.PaymentStatus}
                                onChange={(e) => handleChange("PaymentStatus", e.target.value)}
                            />
                        </div>
                    )}
                    
                    {/* jo data exist krta hai */}
                    {orders.map((o) => (
                    <div
                        key={o.SalesOrderID}
                        style={{
                            ...tableRow,
                            backgroundColor: selected === o.SaleOrderID ? "#e7f1ff" : "white"
                        }}
                        onClick={() => handleRowClick(o)}
                    >

                    {/* ID */}
                    <div style={cellLink} onClick={(e) => handleIDClick(e, o.SalesOrderID)}>
                        {formatID(o.SalesOrderID)}
                    </div>

                        <div>{o.CustomerID}</div>
                        <div>{o.EmployeeID}</div>
                        <div>{o.VehicleID}</div>
                        <div>{o.OrderDate}</div>
                        <div>{o.TotalAmount}</div>
                        <div>{o.DeliveryStatus}</div>
                        <div>{o.PaymentStatus}</div>

                        </div>
                    ))}
                

                
                </div>
            </div>
        </Layout>
    );
}

// css

const tableContainer = {
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const tableHeader = {
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  backgroundColor: "#343a40",
  color: "white",
  padding: "12px",
  fontWeight: "600"
};

const tableRow = {
  display: "grid",
  gridTemplateColumns:  "repeat(8, 1fr)",
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

export default SaleOrder;
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../config";

function SaleLine() {
  const { id } = useParams(); // SalesOrderID

  const [order, setOrder] = useState({});
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [lines, setLines] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({});
  const [employees, setEmployees] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [lineEditMode, setLineEditMode] = useState(false);

  // Fetch Order Data
  useEffect(() => {
    fetch(`${API_BASE_URL}/sales-orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setTempData(data);
      });
  }, [id]);

  // Fetch All Master Data
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/customers`).then(res => res.json()).then(setCustomers);
    fetch(`${API_BASE_URL}/employees`).then(res => res.json()).then(setEmployees);
    fetch(`${API_BASE_URL}/vehicles`).then(res => res.json()).then(setVehicles);
    fetch(`${API_BASE_URL}/api/products`).then(res => res.json()).then(setProducts);
  }, []);

  // Fetch Lines
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/sales-lines/${id}`)
      .then(res => res.json())
      .then(setLines);
  }, [id]);

  // Save Header Logic
  const handleSave = () => {
    fetch(`${API_BASE_URL}/sales-orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempData)
    }).then((res) => {
      if (res.ok) {
        toast.success("Header Updated!");
        setOrder(tempData);
        setEditMode(false);
      }
      else{
        toast.error("Failed to update header");
      }
    }).catch(err => {
      console.error(err);
      toast.error("Error saving data");
    });

  };
  const handleSaveHeader = () => {
    handleSave();
  };

 

  // 1.totla of all order
    const updateOrderGrandTotal = (currentLines) => {
    const total = currentLines.reduce((sum, l) => sum + (Number(l.LineTotal) || 0), 0);
    
    // Sales Orders table ko update 
    fetch(`${API_BASE_URL}/sales-orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...order, TotalAmount: total }) 
    })
     .then(res => {
       if(res.ok) {
    //     // toast.success("Grand Total updated in database!");
        setOrder(prev => ({ ...prev, TotalAmount: total }));
        // toast.success("Grand Total updated!");
     }
     });
  };

  // 2.  check karega Line save or Update
  const handleSaveLine = () => {
    if (selectedIndex === null) return;
    const line = lines[selectedIndex];

    if (!line.ProductID) return toast.error("Please select a product first!");
   
    // FIXED: Strict check for ID
    const isExisting = line.SLineID;
    // const isExisting = line.SLineID !== undefined; 


    const url = isExisting ? `${API_BASE_URL}/api/sales-lines/${line.SLineID}` : `${API_BASE_URL}/api/sales-lines`;
    const method = isExisting ? "PUT" : "POST";

    const body = JSON.stringify({ ...line, SalesOrderID: id });
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...line, SalesOrderID: id })
    })
    .then(res =>{
       if(!res.ok)throw new Error("Save failed");
       return res.text();
      })
    .then(()=> {
      toast.success(isExisting ? "Line Updated!" : "Line Saved!");
      setLineEditMode(false);
      setSelectedIndex(null);
      return fetch(`${API_BASE_URL}/api/sales-lines/${id}`);
    })
      .then(res => res.json())
      .then(freshLines => {
      setLines(freshLines);
     
      updateOrderGrandTotal(freshLines);
      })
      
      .catch(err => {
      console.error(err);
      toast.error("Save failed!");
    });
  };

  const handleLineChange = (index, field, value) => {
    const updated = [...lines];
    updated[index]= { ...updated[index], [field]: value };

    if (field === "ProductID") {
      const product = products.find(p =>String(p.ProductID) === String(value));
      if (product) {
        updated[index].UnitPriceAtSale = product.UnitPrice;
      }
    }

    const qty = parseFloat(updated[index].QuantitySold || 0);
    const price = parseFloat(updated[index].UnitPriceAtSale || 0);
    const discount = parseFloat(updated[index].Discount || 0);
    updated[index].LineTotal = (qty * price) - discount;

    setLines(updated);
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Sales Lines Management</h2>

        {/* --- HEADER SECTION --- */}
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button style={{ ...btnStyle, backgroundColor: "#ffc107" }} onClick={() => setEditMode(true)}>Edit Header</button>
            <button style={{ ...btnStyle, backgroundColor: "#007bff", color: "white" }} onClick={handleSaveHeader}>Save Header</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            <p><b>Order ID:</b> {order.SalesOrderID}</p>
            
            <p><b>Customer:</b> {editMode ? (
              <select style={gridInput} value={tempData.CustomerID || ""} onChange={(e) => setTempData({ ...tempData, CustomerID: e.target.value })}>
                {customers.map(c => <option key={c.CustomerID} value={c.CustomerID}>{c.CustomerName}</option>)}
              </select>
            ) : (customers.find(c => Number(c.CustomerID) === Number(order.CustomerID))?.CustomerName || "N/A")}</p>

            <p><b>Employee:</b> <span>{employees.find(emp => Number(emp.EmployeeID) === Number(order.EmployeeID))?.EmployeeName || order.EmployeeID}</span></p>

            <p><b>Vehicle:</b> {editMode ? (
              <select style={gridInput}
                    value={tempData.VehicleID || ""}
                    onChange={(e) => setTempData({ ...tempData, VehicleID: e.target.value })}>
                    {vehicles.map(v => <option key={v.VehicleID} value={v.VehicleID}>{v.PlateNumber} ({v.Model})</option>)}
              </select>
              // display mode
            ) : (vehicles.find(v => Number(v.VehicleID) === Number(order.VehicleID))?`${vehicles.find(v => Number(v.VehicleID) === Number(order.VehicleID)).PlateNumber} (${vehicles.find(v => Number(v.VehicleID) === Number(order.VehicleID)).Model})`
            : "N/A")}</p>

            <p><b>Date:</b> {order.OrderDate}</p>

            <p style={{ fontSize: "1.2rem", color: "#28a745" }}><b>Grand Total: </b> 
               {lines.reduce((sum, l) => Number(sum) + (Number(l.LineTotal) || 0), 0).toFixed(2)}
            </p>

            <p><b>Status:</b> {editMode ? (
              <select style={gridInput} value={tempData.DeliveryStatus || ""} onChange={(e) => setTempData({ ...tempData, DeliveryStatus: e.target.value })}>
                <option>Pending</option><option>Delivered</option>
              </select>
            ) : order.DeliveryStatus}</p>

            <p><b>Payment:</b> {editMode ? (
            <select style={gridInput} value={tempData.PaymentStatus || ""} onChange={(e) => setTempData({ ...tempData, PaymentStatus: e.target.value })}>
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          ) : order.PaymentStatus}</p>
          </div>
        </div>

        {/* --- GRID ACTION BUTTONS --- */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <button style={{ ...btnStyle, backgroundColor: "#28a745", color: "white" }} onClick={() => {
            const newLines = [...lines, { ProductID: "", QuantitySold: 0, UnitPriceAtSale: 0, Discount: 0, LineTotal: 0 }];
            setLines(newLines);
            setSelectedIndex(newLines.length - 1);
            setLineEditMode(true);
          }}>+ Add New Line</button>
          
          <button style={{ ...btnStyle, backgroundColor: "#ffc107" }} onClick={() => {
            if (selectedIndex === null) return toast.info("Select a row first!");
            setLineEditMode(true);
          }}>Edit Line</button>

          <button style={{ ...btnStyle, backgroundColor: "#007bff", color: "white" }} 
          onClick= {handleSaveLine}>Save Line</button>
        </div>

        {/* --- DATA GRID (TABLE) --- */}
        <div style={tableContainer}>
          <div style={tableHeader}>
            <div>#</div>
            <div>Product</div>
            <div>Qty</div>
            <div>Unit Price</div>
            <div>Discount</div>
            <div>Total</div>
          </div>

          {lines.map((l, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedIndex(index)}
              style={{ ...tableRow, backgroundColor: selectedIndex === index ? "#e9ecef" : "transparent", cursor: "pointer" }}
            >
              <div>{index + 1}</div>
              <div>
                <select
                  disabled={!lineEditMode || selectedIndex !== index}
                  value={l.ProductID || ""}
                  onChange={(e) => handleLineChange(index, "ProductID", e.target.value)}
                >
                  <option value="">Select Product</option>
                  {products.map(p => <option key={p.ProductID} value={p.ProductID}>{p.ProductName}</option>)}
                </select>
              </div>
              <div>
                <input
                  type="number"
                  disabled={!lineEditMode || selectedIndex !== index}
                  value={l.QuantitySold || 0}
                  onChange={(e) => handleLineChange(index, "QuantitySold", e.target.value)}
                />
              </div>
              <div>
                <input
                  disabled={!lineEditMode || selectedIndex !== index}
                  value={l.UnitPriceAtSale || 0}
                  onChange={(e) => handleLineChange(index, "UnitPriceAtSale", e.target.value)}
                />
              </div>
              <div>
                <input
                  disabled={!lineEditMode || selectedIndex !== index}
                  value={l.Discount || 0}
                  onChange={(e) => handleLineChange(index, "Discount", e.target.value)}
                />
              </div>
              <div style={{ fontWeight: "bold" }}>{Number(l.LineTotal || 0).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default SaleLine;

// --- STYLES ---
const btnStyle = { padding: "8px 15px", borderRadius: "5px", border: "none", cursor: "pointer", fontWeight: "bold" };
const gridInput = { width: "100%", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" };
const tableContainer = { borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", background: "white" };
const tableHeader = { display: "grid", gridTemplateColumns: "0.5fr 2fr 1fr 1fr 1fr 1fr", backgroundColor: "#343a40", color: "white", padding: "12px", fontWeight: "600" };
const tableRow = { display: "grid", gridTemplateColumns: "0.5fr 2fr 1fr 1fr 1fr 1fr", padding: "10px", borderBottom: "1px solid #ddd", alignItems: "center" };
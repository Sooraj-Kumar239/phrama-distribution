import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../config";


function PurchaseLines() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [lines, setLines] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [lineEditMode, setLineEditMode] = useState(false);

  // --- Data Fetching ---
  const fetchLines = () => {
    fetch(`${API_BASE_URL}/purchase-lines/${id}`)
      .then((res) => res.json())
      // .then((data) => setLines(data));
      .then((data) => setLines(data.recordset || []));
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/purchase-orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data); // debugging
        setOrder(data);
        setTempData(data);
      
       // FIX: handle both cases
      if (Array.isArray(data)) {
        setLines(data);
      } else if (data.recordset) {
        setLines(data.recordset);
      } else {
        setLines([]);
      }
      
      });

    fetch(`${API_BASE_URL}/vendors`)
      .then((res) => res.json())
      .then(setVendors);

    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then(setProducts);

    fetchLines();
  }, [id]);

  // --- Logic Handlers ---
  const handleSaveHeader = () => {
    fetch(`${API_BASE_URL}/purchase-orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempData),
    })
    .then((res) => {
      if (res.ok) {
        setOrder(tempData);
        toast.info("Header Updated!");
        setEditMode(false);
      }
      else{
        toast.error("Failed to update header");
      }
    })
      .catch((err) => console.error("Error updating header:", err));
      
  };

  const handleFocus = (index, field) => {
    const updated = [...lines];
    if (Number(updated[index][field]) === 0) {
      updated[index][field] = "";
      setLines(updated);
    }
  };

  const handleLineChange = (index, field, value) => {
    const numericRegex = /^\d*\.?\d*$/;
    if (field === "QuantityOrdered" && value !== "" && !numericRegex.test(value)) {
      return;
    }

    const updated = [...lines];
    updated[index][field] = value;

    if (field === "ProductID") {
      const product = products.find((p) => Number(p.ProductID) === Number(value));
      if (product) {
        updated[index].UnitCostAtPurchase = Number(product.UnitPrice || product.UnitCost || 0);
      }
    }

    const qty = Number(updated[index].QuantityOrdered) || 0;
    const cost = Number(updated[index].UnitCostAtPurchase) || 0;
    updated[index].LineTotal = (qty * cost).toFixed(3);

    setLines(updated);
  };

  const saveLines = async () => {
    try {
      const newLinesOnly = lines.filter((line) => !line.PLineID);
      if (newLinesOnly.length === 0) {
        toast.info("No new lines to save!");
        return;
      }

      for (let line of newLinesOnly) {
        if (!line.ProductID || !line.QuantityOrdered) {
          toast.info("Fill all fields ❗");
          return;
        }

        await fetch(`${API_BASE_URL}/purchase-lines`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            PurchaseOrderID: id,
            ProductID: line.ProductID,
            QuantityOrdered: Number(line.QuantityOrdered),
            UnitCostAtPurchase: Number(line.UnitCostAtPurchase),
          }),
        });
      }

      toast.info("New lines saved ");
      // setLines([]);
      fetchLines();
      setSelectedIndex(null);
    } catch (err) {
      console.error(err);
    }
  };

  const updateLine = async (line) => {
    try {
      const response = await fetch(`${API_BASE_URL}/purchase-lines/${line.PLineID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ProductID: line.ProductID,
          QuantityOrdered: Number(line.QuantityOrdered),
          UnitCostAtPurchase: Number(line.UnitCostAtPurchase),
        }),
      });
      const data = await response.json();
      toast.success(data.message || "Updated ");
      fetchLines();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Design Styles ---
  const btnStyle = { padding: "8px 16px", cursor: "pointer", border: "none", borderRadius: "4px", fontWeight: "600" };
  const gridInput = { width: "100%", padding: "6px", border: "1px solid #ccc", borderRadius: "4px" };

  return (
    <Layout>
      <div style={{ padding: "30px", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>Purchase Order Management</h2>

        {/* HEADER SECTION */}
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button style={{ ...btnStyle, backgroundColor: "#ffc107" }} onClick={() => setEditMode(true)}>Edit Header</button>
            <button style={{ ...btnStyle, backgroundColor: "#007bff", color: "white" }} onClick={handleSaveHeader}>Save Header</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            <p><b>Order ID:</b> {order.PurchaseOrderID}</p>
            <p><b>Name:</b> {editMode ? <input style={gridInput} value={tempData.OrderName || ""} onChange={(e) => setTempData({ ...tempData, OrderName: e.target.value })} /> : order.OrderName}</p>
            <p><b>Vendor:</b> {editMode ? (
              <select style={gridInput} value={tempData.VendorID} onChange={(e) => setTempData({ ...tempData, VendorID: e.target.value })}>
                {vendors.map(v => <option key={v.VendorID} value={v.VendorID}>{v.VendorName}</option>)}
              </select>
            ) : vendors.find(v => Number(v.VendorID) === Number(order.VendorID))?.VendorName}</p>
            <p><b>Status:</b> {editMode ? (
              <select style={gridInput} value={tempData.OrderStatus} onChange={(e) => setTempData({ ...tempData, OrderStatus: e.target.value })}>
                <option>Pending</option><option>Received</option>
              </select>
            ) : order.OrderStatus}</p>
            <p><b>Date:</b> {order.OrderDate}</p>
            <p style={{ fontSize: "1.2rem", color: "#28a745" }}><b>Grand Total: </b> 
               {lines.reduce((sum, l) => Number(sum) + (Number(l.LineTotal) || 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* GRID BUTTONS */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <button style={{ ...btnStyle, backgroundColor: "#28a745", color: "white" }} onClick={() => {
            const newLines = [...lines, { ProductID: "", QuantityOrdered: 0, UnitCostAtPurchase: 0, LineTotal: 0 }];
            setLines(newLines);
            setSelectedIndex(newLines.length - 1);
            setLineEditMode(true);
          }}>+ Add New Line</button>
          
          <button style={{ ...btnStyle, backgroundColor: "#ffc107" }} onClick={() => {
            if (selectedIndex === null) return toast.info("Select a row first!");
            setLineEditMode(true);
          }}>Edit Line</button>

          <button style={{ ...btnStyle, backgroundColor: "#007bff", color: "white" }} onClick={() => {
            if (selectedIndex === null) return;
            const line = lines[selectedIndex];
            line.PLineID ? updateLine(line) : saveLines();
            setLineEditMode(false);
          }}>Save Line</button>
        </div>

        {/* DATA GRID */}
        <div style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "50px 1fr 100px 150px 150px", backgroundColor: "#343a40", color: "white", padding: "12px", fontWeight: "bold" }}>
            <div>#</div><div>Product</div><div>Qty</div><div>Unit Cost</div><div>Line Total</div>
          </div>

          {lines.map((l, index) => (
            <div key={l.PLineID || index} onClick={() => setSelectedIndex(index)} 
                 style={{ display: "grid", gridTemplateColumns: "50px 1fr 100px 150px 150px", padding: "10px", borderBottom: "1px solid #eee", cursor: "pointer", 
                          backgroundColor: selectedIndex === index ? "#e7f3ff" : "white", alignItems: "center" }}>
              <div style={{ fontWeight: "bold", color: "#666" }}>{index + 1}</div>
              <div>
                <select style={gridInput} disabled={!lineEditMode || selectedIndex !== index} value={l.ProductID || ""} onChange={(e) => handleLineChange(index, "ProductID", e.target.value)}>
                  <option value="">Select Product</option>
                  {products.map(p => <option key={p.ProductID} value={p.ProductID}>{p.ProductName}</option>)}
                </select>
              </div>
              <div>
                <input type="text" style={{ ...gridInput, textAlign: "center" }} disabled={!lineEditMode || selectedIndex !== index}
                       value={l.QuantityOrdered === 0 ? "" : l.QuantityOrdered} placeholder="0" onFocus={() => handleFocus(index, "QuantityOrdered")}
                       onChange={(e) => handleLineChange(index, "QuantityOrdered", e.target.value)} />
              </div>
              <div>
                <input type="text" style={{ ...gridInput, backgroundColor: "#f8f9fa" }} disabled value={Number(l.UnitCostAtPurchase || 0).toFixed(2)} />
              </div>
              <div style={{ textAlign: "right", fontWeight: "bold", color: "#333", paddingRight: "10px" }}>
                {Number(l.LineTotal || 0).toFixed(3)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
export default PurchaseLines;

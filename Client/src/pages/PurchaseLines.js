import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";

function PurchaseLines() {

    const { id } = useParams(); //  coming from click
    const [order, setOrder] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);
    const [lines, setLines] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState([]);
    // const [tempLine, setTempLine] = useState([]);


    //  Fetch data
    useEffect(() => {
        fetch(`http://localhost:3003/purchase-orders/${id}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setTempData(data);
            });
    },[id]);

    // fetch vendors
    useEffect(() => {
        fetch(`http://localhost:3003/vendors`)
            .then(res => res.json())
            .then(setVendors);
    },[]);

    // PRODUCTS
    useEffect(() => {
    fetch("http://localhost:3003/products")
        .then(res => res.json())
        .then(setProducts);
    }, []);
        
    //  Fetch lines
    useEffect(() => {
        fetch(`http://localhost:3003/purchase-lines/${id}`)
            .then(res => res.json())
            .then(data => setLines(data));
    },[id]);



        // save line
        const handleSave = () => {
        fetch(`http://localhost:3003/purchase-orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempData)
        })
        .then(() => {
        alert("Updated!");
        setEditMode(false);
        });
        };

        // line logic
        const handleLineChange = (index, field, value) => {

        const updated = [...lines];
        updated[index][field] = value;

        // product select → auto cost
        if (field === "ProductID") {
        const product = products.find(p => p.ProductID == value);
        if (product) {
        updated[index].UnitCost = product.UnitPrice;
        }
        }

        // total calculate
        updated[index].LineTotal =
        (updated[index].Quantity || 0) * (updated[index].UnitCost || 0);

        setLines(updated);
  };

         const addLine = () => {
        setLines([
        ...lines,
      {
        ProductID: "",
        Quantity: 0,
        UnitCost: 0,
        LineTotal: 0
         }
        ]);
    };

    // ADD
    // const addLine = () => {
    //     fetch("http://localhost:3003/purchaselines", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             PurchaseOrderID,
    //             ProductID,
    //             QuantityOrdered,
    //             UnitCostAtPurchase
    //         })
    //     })
    //     .then(() => {
    //         fetch(`http://localhost:3003/purchaselines/${PurchaseOrderID}`)
    //             .then(res => res.json())
    //             .then(data => setLines(data));

    //         setProductID("");
    //         setQuantityOrdered("");
    //         setUnitCostAtPurchase("");
    //     });
    // };

    return (
    <Layout>
      <div style={{ padding: "20px" }}>

        <h2>Purchase Lines</h2>

        {/* ================= HEADER BUTTONS ================= */}
        <div style={btnContainer}>
          <button style={btnYellow} onClick={() => setEditMode(true)}>Edit</button>
          <button style={btnBlue} onClick={handleSave}>Save</button>
        </div>

        {/* ================= HEADER DATA ================= */}
        <div style={headerBox}>

          <div><b>ID:</b> {order.PurchaseOrderID}</div>

          <div>
            <b>Name:</b>
            {editMode ? (
              <input
                value={tempData.OrderName || ""}
                onChange={(e) =>
                  setTempData({ ...tempData, OrderName: e.target.value })
                }
              />
            ) : order.OrderName}
          </div>

          <div>
            <b>Vendor:</b>
            {editMode ? (
              <select
                value={tempData.VendorID}
                onChange={(e) =>
                  setTempData({ ...tempData, VendorID: e.target.value })
                }
              >
                {vendors.map(v => (
                  <option key={v.VendorID} value={v.VendorID}>
                    {v.VendorName}
                  </option>
                ))}
              </select>
            ) : (
              vendors.find(v => v.VendorID === order.VendorID)?.VendorName
            )}
          </div>

          <div>
            <b>Status:</b>
            {editMode ? (
              <select
                value={tempData.OrderStatus}
                onChange={(e) =>
                  setTempData({ ...tempData, OrderStatus: e.target.value })
                }
              >
                <option>Pending</option>
                <option>Received</option>
              </select>
            ) : order.OrderStatus}
          </div>

        </div>

        {/* ================= LINE BUTTONS ================= */}
        <div style={btnContainer}>
          <button style={btnGreen} onClick={addLine}>+ Add Line</button>
        </div>

        {/* ================= GRID ================= */}
        <div style={tableContainer}>

          <div style={tableHeader}>
            <div>Line</div>
            <div>Product</div>
            <div>Qty</div>
            <div>Unit Cost</div>
            <div>Total</div>
          </div>

          {lines.map((l, index) => (
            <div key={index} style={tableRow}>

              <div>{index + 1}</div>

              <select
                value={l.ProductID || ""}
                onChange={(e) =>
                  handleLineChange(index, "ProductID", e.target.value)
                }
              >
                <option value="">Select</option>
                {products.map(p => (
                  <option key={p.ProductID} value={p.ProductID}>
                    {p.ProductName}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={l.Quantity || 0}
                onChange={(e) =>
                  handleLineChange(index, "Quantity", e.target.value)
                }
              />

              <input
                value={l.UnitCost || 0}
                onChange={(e) =>
                  handleLineChange(index, "UnitCost", e.target.value)
                }
              />

              <div>{l.LineTotal || 0}</div>

            </div>
          ))}

        </div>

      </div>
    </Layout>
  );
}

export default PurchaseLines;
const headerBox = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "10px",
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px"
};

const btnContainer = {
  marginBottom: "15px"
};

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
  borderBottom: "1px solid #ddd"
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
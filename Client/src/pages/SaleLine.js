import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function SalesLines() {

  const { id } = useParams(); // SalesOrderID

  const [order, setOrder] = useState({});
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [lines, setLines] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({});

    //fetech orders
  useEffect(() => {
    fetch(`http://localhost:3003/sales-orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setTempData(data);
      });
  }, [id]);

  //fetch customers
  useEffect(() => {
    fetch(`http://localhost:3003/customers`)
      .then(res => res.json())
      .then(setCustomers);
  }, []);

  //fetch product
  useEffect(() => {
    fetch(`http://localhost:3003/products`)
      .then(res => res.json())
      .then(setProducts);
  }, []);

  //line ko fetch karo
  useEffect(() => {
    fetch(`http://localhost:3003/sales-lines/${id}`)
      .then(res => res.json())
      .then(setLines);
  }, [id]);

  // save header
  const handleSave = () => {
    fetch(`http://localhost:3003/sales-orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempData)
    }).then(() => {
      toast.info("Updated!");
      setEditMode(false);
    });
  };

  // 
  const handleLineChange = (index, field, value) => {

    const updated = [...lines];
    updated[index][field] = value;

    //  jb product select ho pricw auto ajae
    if (field === "ProductID") {
      const product = products.find(p => p.ProductID == value);
      if (product) {
        updated[index].UnitPriceAtSale = product.UnitPrice; // 🔥 yahan change
      }
    }

    // Total = Qty * Price - Discount
    const qty = parseFloat(updated[index].QuantitySold || 0);
    const price = parseFloat(updated[index].UnitPriceAtSale || 0);
    const discount = parseFloat(updated[index].Discount || 0);

    updated[index].LineTotal = (qty * price) - discount;

    setLines(updated);
  };

  // add line
  const addLine = () => {
    setLines([
      ...lines,
      {
        ProductID: "",
        QuantitySold: 0,
        UnitPriceAtSale: 0,
        Discount: 0,
        LineTotal: 0
      }
    ]);
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>

        <h2>Sales Lines</h2>

        {/* HEADER BUTTONS */}
        <div style={btnContainer}>
          <button style={btnYellow} onClick={() => setEditMode(true)}>Edit</button>
          <button style={btnBlue} onClick={handleSave}>Save</button>
        </div>

        {/* HEADER DATA */}
        <div style={headerBox}>

          <div><b>ID:</b> {order.SalesOrderID}</div>

          <div>
            <b>Customer:</b>
            {editMode ? (
              <select
                value={tempData.CustomerID || ""}
                onChange={(e) =>
                  setTempData({ ...tempData, CustomerID: e.target.value })
                }
              >
                {customers.map(c => (
                  <option key={c.CustomerID} value={c.CustomerID}>
                    {c.CustomerName}
                  </option>
                ))}
              </select>
            ) : (
              customers.find(c => c.CustomerID === order.CustomerID)?.CustomerName
            )}
          </div>

          <div>
            <b>Status:</b>
            {editMode ? (
              <select
                value={tempData.DeliveryStatus || ""}
                onChange={(e) =>
                  setTempData({ ...tempData, DeliveryStatus: e.target.value })
                }
              >
                <option>Pending</option>
                <option>Delivered</option>
              </select>
            ) : order.DeliveryStatus}
          </div>

          <div>
            <b>Payment:</b>
            {editMode ? (
              <select
                value={tempData.PaymentStatus || ""}
                onChange={(e) =>
                  setTempData({ ...tempData, PaymentStatus: e.target.value })
                }
              >
                <option>Unpaid</option>
                <option>Paid</option>
              </select>
            ) : order.PaymentStatus}
          </div>

        </div>

        {/* ADD LINE */}
        <div style={btnContainer}>
          <button style={btnGreen} onClick={addLine}>+ Add Line</button>
        </div>

        {/* GRID */}
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
            <div key={index} style={tableRow}>

              <div>{index + 1}</div>

              {/* PRODUCT */}
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

              {/* QTY */}
              <input
                type="number"
                value={l.QuantitySold || 0}
                onChange={(e) =>
                  handleLineChange(index, "QuantitySold", e.target.value)
                }
              />

              {/* PRICE */}
              <input
                value={l.UnitPriceAtSale || 0}
                onChange={(e) =>
                  handleLineChange(index, "UnitPriceAtSale", e.target.value)
                }
              />

              {/* DISCOUNT */}
              <input
                value={l.Discount || 0}
                onChange={(e) =>
                  handleLineChange(index, "Discount", e.target.value)
                }
              />

              {/* TOTAL */}
              <div>{l.LineTotal || 0}</div>

            </div>
          ))}

        </div>

      </div>
    </Layout>
  );
}

export default SalesLines;

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
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
  backgroundColor: "#343a40",
  color: "white",
  padding: "12px",
  fontWeight: "600"
};

const tableRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
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
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";

function PurchaseLines() {

    const { id } = useParams(); // 👈 coming from click
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [lines, setLines] = useState([]);

    const [PurchaseOrderID, setPurchaseOrderID] = useState(id || "");
    const [ProductID, setProductID] = useState("");
    const [QuantityOrdered, setQuantityOrdered] = useState("");
    const [UnitCostAtPurchase, setUnitCostAtPurchase] = useState("");

    const [selectedOrder, setSelectedOrder] = useState(null);

    // 🔥 Fetch data
    useEffect(() => {
        fetch("http://localhost:3003/purchase-orders")
            .then(res => res.json())
            .then(data => {
                setOrders(data);

                if (id) {
                    const found = data.find(o => o.PurchaseOrderID == id);
                    setSelectedOrder(found);
                }
            });

        fetch("http://localhost:3003/products")
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [id]);

    // 🔥 Fetch lines
    useEffect(() => {
        if (PurchaseOrderID) {
            fetch(`http://localhost:3003/purchaselines/${PurchaseOrderID}`)
                .then(res => res.json())
                .then(data => setLines(data));
        }
    }, [PurchaseOrderID]);

    // ➕ ADD
    const addLine = () => {
        fetch("http://localhost:3003/purchaselines", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                PurchaseOrderID,
                ProductID,
                QuantityOrdered,
                UnitCostAtPurchase
            })
        })
        .then(() => {
            fetch(`http://localhost:3003/purchaselines/${PurchaseOrderID}`)
                .then(res => res.json())
                .then(data => setLines(data));

            setProductID("");
            setQuantityOrdered("");
            setUnitCostAtPurchase("");
        });
    };

    return (
        <Layout>

            <h2>Purchase Lines</h2>

            {/* 🔽 ORDER SELECT */}
            {!id && (
                <select
                    value={PurchaseOrderID}
                    onChange={(e) => setPurchaseOrderID(e.target.value)}
                >
                    <option value="">Select Order</option>
                    {orders.map(o => (
                        <option key={o.PurchaseOrderID} value={o.PurchaseOrderID}>
                            Order #{o.PurchaseOrderID}
                        </option>
                    ))}
                </select>
            )}

            {/* 📊 ORDER GRID */}
            {selectedOrder && (
                <div style={{
                    marginTop: "20px",
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    background: "#f9f9f9"
                }}>

                    {/* ROW 1 */}
                    <div style={{ display: "flex", gap: "30px" }}>
                        <div><b>Order ID:</b> {selectedOrder.PurchaseOrderID}</div>
                        <div><b>Vendor:</b> {selectedOrder.VendorID}</div>
                        <div><b>Employee:</b> {selectedOrder.EmployeeID}</div>
                    </div>

                    {/* ROW 2 */}
                    <div style={{ display: "flex", gap: "30px", marginTop: "10px" }}>
                        <div><b>Total:</b> {selectedOrder.TotalCost}</div>
                        <div><b>Status:</b> {selectedOrder.OrderStatus}</div>
                        <div><b>Date:</b> {selectedOrder.CreatedAt || "N/A"}</div>
                    </div>
                </div>
            )}

            {/* ➕ ADD FORM */}
            {PurchaseOrderID && (
                <div style={{
                    marginTop: "20px",
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px"
                }}>

                    <h3>Add Purchase Line</h3>

                    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>

                        <select
                            value={ProductID}
                            onChange={(e) => setProductID(e.target.value)}
                        >
                            <option value="">Select Product</option>
                            {products.map(p => (
                                <option key={p.ProductID} value={p.ProductID}>
                                    {p.ProductName}
                                </option>
                            ))}
                        </select>

                        <input
                            placeholder="Quantity"
                            value={QuantityOrdered}
                            onChange={(e) => setQuantityOrdered(e.target.value)}
                        />

                        <input
                            placeholder="Unit Cost"
                            value={UnitCostAtPurchase}
                            onChange={(e) => setUnitCostAtPurchase(e.target.value)}
                        />

                        <button onClick={addLine}>Add</button>
                    </div>
                </div>
            )}

            {/* 📋 TABLE */}
            {PurchaseOrderID && (
                <table border="1" style={{ width: "100%", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>Line #</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Unit Cost</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lines.map(l => (
                            <tr key={l.PLineID}>
                                <td>{l.PLineID}</td>
                                <td>{l.ProductName}</td>
                                <td>{l.QuantityOrdered}</td>
                                <td>{l.UnitCostAtPurchase}</td>
                                <td>{l.LineTotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </Layout>
    );
}

export default PurchaseLines;
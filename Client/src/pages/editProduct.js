import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

function EditProduct() {

    const { id } = useParams();

    const [name, setName] = useState("");
    const [batch, setBatch] = useState("");
    const [expiry, setExpiry] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [reorder, setReorder] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3003/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.ProductName);
                setBatch(data.BatchNumber);
                setExpiry(data.ExpiryDate.split("T")[0]);
                setStock(data.StockQuantity);
                setPrice(data.UnitPrice);
                setReorder(data.ReorderLevel);
            });
    }, [id]);

    const updateProduct = () => {
        fetch(`http://localhost:3003/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ProductName: name,
                BatchNumber: batch,
                ExpiryDate: expiry,
                StockQuantity: stock,
                UnitPrice: price,
                ReorderLevel: reorder
            })
        })
            .then(res => res.text())
            .then(() => {
                window.location.href = "/products?msg=updated";
            });
    };

    return (
        <Layout>
        <div style={{
            width: "90%",
            margin: "40px auto",
            maxWidth: "500px",
            // height: "90vh",        
            // overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }} >
            <h2 style={{ marginBottom: "20px" }}>Edit Product</h2>

            <label>Product Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

            <label>Batch Number</label>
            <input value={batch} onChange={(e) => setBatch(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

            <label>Expiry Date</label>
            <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

            <label>Stock Quantity</label>
            <input value={stock} onChange={(e) => setStock(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

            <label>Unit Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

            <label>Reorder Level</label>
            <input value={reorder} onChange={(e) => setReorder(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

            <button
                onClick={updateProduct}
                style={{
                    marginTop: "20px",
                    width: "40%",
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                Update Product
            </button>
        </div>
        </Layout>
    );
}

export default EditProduct;
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import API_BASE_URL from "../config";

function Products(){
    // return <Layout>
    //         <h2>Product Page</h2>
    //     </Layout>

    // states kyu?
    const [name, setName] = useState("");
    const [batch, setBatch] = useState("");
    const [expiry, setExpiry] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [reorder, setReorder] = useState("");
    const [products, setProducts] = useState([]);
    // message show when data inserted 
    const [message, setMessage] = useState("");
    //message show when data row deleted
    const [msgType, setMsgType] = useState("");
    // for data edit and show update
    const [editId, setEditId] = useState(null);
    // styling
    const inputStyle = {
                        width: "10%",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    };

    const addBtn = {
                    width: "10%",
                    padding: "10px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                };

    const fetchProducts = () => {
    fetch(`${API_BASE_URL}/api/products`)
        .then(res => res.json())
        .then(data => {setProducts(data);
        })
        .catch(err => console.log(err));
    };
        useEffect(() => {
            fetchProducts();
            const params = new URLSearchParams(window.location.search);
            const msg = params.get("msg");
            //  console.log("MSG:", msg); 

            if (msg === "updated") {
                setMessage("Product Updated Successfully");
                setMsgType("update");

                setTimeout(() => {
                setMessage("");
                setMsgType("");
                }, 3000);
             }

        }, []);
   
    const deleteProduct = (id) => {
        fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "DELETE"
        })
        .then(res => res.text())
        .then(data => {
        setMessage("Product Deleted Successfully");
        setMsgType("delete"); 
        fetchProducts();

        setTimeout(() => {
            setMessage("");
        }, 3000);
        })
        .catch(err => console.log(err));
    };


    const addProduct = () => {
        fetch(`${API_BASE_URL}/api/products`, {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
        
            body: JSON.stringify
            ({
                ProductName: name,
                BatchNumber: batch,
                ExpiryDate: expiry,
                StockQuantity: stock,
                UnitPrice: price,
                ReorderLevel: reorder
            })
        })
            .then(res => res.text())
                .then(data => {
                                 setMessage("Product Added Successfully");
                                 setMsgType("success");
                                // to cleAR form 
                                setName("");
                                setBatch("");
                                setExpiry("");
                                setStock("");
                                setPrice("");
                                setReorder("");
                                // referesh the list
                                fetchProducts();
                                setTimeout(() => {
                                setMessage("");
                                 }, 3000); 
                })
                                .catch(err => console.log(err));
        };
                

        return (
            <Layout>
        <div>

                    {/* <h1>Dashboard</h1> */}
                         {message && (
                    <div style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: msgType === "success" ? "green":
                                         msgType === "delete"  ? "red" :
                                         msgType === "update"  ? "#007bff": "#6c757d",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px"
                            }}>
                          {message}
                    </div>
)}          
                            <h3>Add Product</h3>
                            
                            <input style={inputStyle} placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
                            <input style={inputStyle} placeholder="Batch Number" onChange={(e) => setBatch(e.target.value)} />
                            <input style={inputStyle} type="date" onChange={(e) => setExpiry(e.target.value)} />
                            <input style={inputStyle} placeholder="Stock" type="number" onChange={(e) => setStock(e.target.value)} />
                            <input style={inputStyle} placeholder="Unit Price" type="number" onChange={(e) => setPrice(e.target.value)} />
                            <input style={inputStyle} placeholder="Reorder Level" type="number" onChange={(e) => setReorder(e.target.value)} />

                              <button style={addBtn} onClick={addProduct}>Add Product</button>

                                <h2>All Products</h2>
                                <table border="1" cellPadding="10">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Batch</th>
                                        <th>Expiry</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Reorder</th>
                                        <th colSpan="2">Action</th>
                                    </tr>
                                </thead>

                                 <tbody>
                                    {products.length === 0 ? (
                                        <tr>
                                             <td colSpan="6">No data found</td>
                                         </tr>
                                     ) : (
                                     products.map((p) => (
                                        <tr key={p.ProductID}>
                                            <td>{p.ProductName}</td>
                                            <td>{p.BatchNumber}</td>
                                            {/* <td>{p.ExpiryDate}</td> */}
                                            <td>{p.ExpiryDate.split("T")[0]}</td>
                                            <td>{p.StockQuantity}</td>
                                            <td>{p.UnitPrice}</td>
                                            <td>{p.ReorderLevel}</td>
                                            <td>
                                             <button
                                                    onClick={() => window.location.href = `/products/edit/${p.ProductID}`}
                                                    style={{
                                                    backgroundColor: "#007bff",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "5px 10px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer"
                                                    }}
                                                    >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button 
                                                onClick={() => deleteProduct(p.ProductID)}
                                                style={{
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "5px 10px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer"
                                                }}
                                                                    >
                                                        Delete
                                                    </button>
                                                    </td>
                                         </tr>

                            
                        ))
                )}
            </tbody>
        </table>
   

        </div>
        </Layout>
  );
}

export default Products;
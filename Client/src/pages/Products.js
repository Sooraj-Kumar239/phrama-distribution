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
                <style>{internalCSS}</style>
                <div>
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
                            <div className="product-form-container" > 
                            <input  placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
                            <input  placeholder="Batch Number" onChange={(e) => setBatch(e.target.value)} />
                            <input  type="date" onChange={(e) => setExpiry(e.target.value)} />
                            <input  placeholder="Stock" type="number" onChange={(e) => setStock(e.target.value)} />
                            <input  placeholder="Unit Price" type="number" onChange={(e) => setPrice(e.target.value)} />
                            <input  placeholder="Reorder Level" type="number" onChange={(e) => setReorder(e.target.value)} />

                              <button  onClick={addProduct}>Add Product</button>
                            </div>
                                <h2>All Products</h2>
            <table className="product-table" border="1" cellPadding="10">
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
        </div>
        </Layout>
  );
}

export default Products;
// css
const internalCSS = `
    .product-form-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        background: #f4f7f6;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }

    .product-input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
        transition: border 0.3s;
    }

    .product-input:focus {
        border-color: #28a745;
    }

    .add-product-btn {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
    }

    .add-product-btn:hover {
        background-color: #218838;
    }

    .product-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .product-table th {
        background-color: #343a40;
        color: white;
        padding: 15px;
        text-align: left;
    }

    .product-table td {
        padding: 12px 15px;
        border-bottom: 1px solid #eee;
    }

    .product-table tr:hover {
        background-color: #f9f9f9;
    }
`;
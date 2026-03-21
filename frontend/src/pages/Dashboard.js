import { useEffect, useState } from "react";
function Dashboard(){

    // states kyu?
    const [name, setName] = useState("");
    const [batch, setBatch] = useState("");
    const [expiry, setExpiry] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [reorder, setReorder] = useState("");
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        fetch("http://localhost:3003/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.log(err));
    };


    const addProduct = () => {
        fetch("http://localhost:3003/products", {
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
                                alert(data);
                                // to cleAR form 
                                setName("");
                                setBatch("");
                                setExpiry("");
                                setStock("");
                                setPrice("");
                                setReorder("");
                                // referesh the list
                                fetchProducts(); 
            })
                                .catch(err => console.log(err));
    };
                useEffect(() => {
            fetchProducts();
             }, []);

        return (
        <div>

      <h1>Dashboard</h1>
     <h3>Add Product</h3>

      <input placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Batch Number" onChange={(e) => setBatch(e.target.value)} />
      <input type="date" onChange={(e) => setExpiry(e.target.value)} />
      <input placeholder="Stock" type="number" onChange={(e) => setStock(e.target.value)} />
      <input placeholder="Unit Price" type="number" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Reorder Level" type="number" onChange={(e) => setReorder(e.target.value)} />

      <button onClick={addProduct}>Add Product</button>

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
                                <td>{p.ExpiryDate}</td>
                                <td>{p.StockQuantity}</td>
                                <td>{p.UnitPrice}</td>
                                <td>{p.ReorderLevel}</td>
                                <td><a href="">Edit</a></td>
                                <td><a href="">Delete</a></td>
                            
                            </tr>
                        ))
                )}
            </tbody>
        </table>
   

        </div>
  );
}

export default Dashboard;
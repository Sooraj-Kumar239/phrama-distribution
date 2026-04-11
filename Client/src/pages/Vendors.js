import { useEffect, useState } from "react";

import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

function Vendors() {

    const [vendors, setVendors] = useState([]);
    const [VendorName, setVendorName] = useState("");
    const [ContactPerson, setContactPerson] = useState("");
    const [Email, setEmail] = useState("");
    // form
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [msgType, setMsgType] = useState("");
    

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const msg = params.get("msg");
            if (msg === "updated") {
                setMessage("Distributor updated successfully");
                setMsgType("update");
            }
            fetch(`${API_BASE_URL}/vendors`)
                .then(res => res.json())
                .then(data => setVendors(data))
                .catch(err => console.log(err));
    }, []) ;

    
            useEffect(() => {
            if (message) {
                const timer = setTimeout(() => {
                    setMessage("");
                    setMsgType("");

                    
                    window.history.replaceState({}, document.title, "/vendors");

                }, 3000);

                return () => clearTimeout(timer);
            }
}, [message]);
            const deleteVendor = (id) => {
                fetch(`${API_BASE_URL}/vendors/${id}`,{
                method: "DELETE"
                })
                .then(res => res.json())
                .then(() => {
                    setVendors(vendors.filter(v => v.VendorID !== id));
                    setMessage("Distributor deleted successfully");
                    setMsgType("delete");
                });
            }
    
            const addVendor = () => {
                fetch(`${API_BASE_URL}/vendors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            
                body: JSON.stringify({
                VendorName,
                ContactPerson,
                Email,
                LicenseNumber: "123",
                Address: "Test Address"
            })
        })


            .then(res => res.text())
            .then(() => {

        
                fetch(`${API_BASE_URL}/vendors`)
                .then(res => res.json())
                .then(data => setVendors(data));

        
                setVendorName("");
                setContactPerson("");
                setEmail("");

      
                setShowForm(false);
                setMessage("Distributor added successfully");
                setMsgType("success");
            });
        };

    
        return (
            <div>
           
        <Layout>
                 {message && (
                    <div style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px",
                            backgroundColor: msgType === "success" ? "green" :
                            msgType === "delete"  ? "red" :
                            msgType === "update"  ? "#007bff" : "#6c757d",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "5px"
                        }}>
                            {message}
                    </div>
                )}
            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>All Distributors</h2>

                    <button onClick={() => setShowForm(!showForm)}
                        style={{
                            backgroundColor: showForm ? "#dc3545" : "#28a745",
                            color: "white",
                            padding: "8px 14px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                        >
                        {showForm ? "Cancel" : "+ Add New Distributor"}
                    </button>
                </div>
               
                {/* show form */}
                {showForm && (
                    <div>
                        <h3>Add Vendor</h3>

                        <input type="text" placeholder="Vendor Name" value={VendorName} onChange={(e) => setVendorName(e.target.value)}
                        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px" }}/>

                        <input type="text" placeholder="Contact Person" value={ContactPerson} onChange={(e) => setContactPerson(e.target.value)}/>

                        <input type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)}/>

                        <button onClick={addVendor}>Add New Distributor</button>
                    </div>
                )}
                
                <table border="1"  style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px"}}>
                    <thead style={{ backgroundColor: "#f2f2f2" }}>
                        <tr>
                            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Name</th>
                            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Contact</th>
                            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Email</th>
                            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {vendors.map(v => (
                            <tr key={v.VendorID}>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{v.VendorName}</td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{v.ContactPerson}</td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{v.Email}</td>

                                <td style={{padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center"}}>
                                    
                                    <button 
                                        onClick={()=>window.location.href = `/vendors/edit/${v.VendorID}`}
                                        style={{ backgroundColor: "#007bff", color: "white",border: "none", padding: "5px 10px", borderRadius: "4px", marginRight: "5px",
                                            cursor: "pointer"
                                        }}
                                        >
                                        Edit
                                    </button>
                                    <button onClick={() => deleteVendor(v.VendorID)} 
                                        style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer"}}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
        </div>
    );
}

export default Vendors;
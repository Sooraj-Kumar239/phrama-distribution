import { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import { Form } from "react-router-dom";
import API_BASE_URL from "../config";

function Customers(){
    const [customers, setCustomers] = useState([]);
    const [CustomerName, setCustomerName] = useState("");
    const [ContactPerson, setContactPerson] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [CustomerType, setCustomerType] = useState("");

    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [msgType, setMsgType] = useState("");

    const [errors, setErrors] = useState({});
// styling
    const fieldStyle = {
        marginBottom: "12px"
    };

    const inputStyle = {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc"
    };

    const errorStyle = {
        color: "red",
        fontSize: "12px",
        height: "14px", 
        margin: "2px 0 0 0"
    };

    // reset form
    const resetForm = () => {
    setCustomerName("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setAddress("");
    setCustomerType("");
    setErrors({});
};


    // message timer after succes
    useEffect(() => {
    if (message) {
            const timer = setTimeout(() => {
            setMessage("");
            setMsgType("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    // fetch data
    useEffect(() => {
        // fetch(`http://localhost:3003/customers`)
        fetch(`${API_BASE_URL}/api/customers`)
        .then(res => res.json())
        .then(data => setCustomers(data));
    },[]);

    // add new customer
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit clicked");
        // validation
            const newErrors = {};

            if (!CustomerName.trim()) newErrors.CustomerName = "Customer Name required";
            if (!ContactPerson.trim()) newErrors.ContactPerson = "Contact Person required";
            if (!Phone.trim()) newErrors.Phone = "Phone required";
            // if (!Email.trim()) newErrors.Email = "Email required";
            if (!Address.trim()) newErrors.Address = "Address required";
            if (!CustomerType.trim()) newErrors.CustomerType = "Customer Type required";


             //  Email format validation 
                if (Email && !Email.includes("@")) {
                    newErrors.Email = "Invalid email";
                }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
        // validation end

       
        fetch(`${API_BASE_URL}/api/customers`, {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                CustomerName,
                ContactPerson,
                Phone,
                Email,
                Address,
                CustomerType
            })
        })

        .then(res => res.text())
        .then(msg => {

            // refresh list
            // fetch(`http://localhost:3003/customers`)
            fetch(`${API_BASE_URL}/api/customers`)
            .then(res => res.json())
            .then(data => setCustomers(data));
            // set error
            setErrors({});
            // clear form
            setCustomerName("");
            setContactPerson("");
            setPhone("");
            setEmail("");
            setAddress("");
            setCustomerType("");

            // message
            setMessage("Customer added successfully");
            setMsgType("success");
            setShowForm(false);
        });
    };

    //delete customers
    const handleDelete = (id) => {
        fetch(`${API_BASE_URL}/api/customers/${id}`, {
            method: "DELETE"
        })
        .then(res => res.text())
        .then(() => {

            // fetch(`http://localhost:3003/customers`)
            fetch(`${API_BASE_URL}/api/customers`)
            .then(res => res.json())
            .then(data => setCustomers(data));

            setMessage("Customer deleted successfully");
            setMsgType("delete");
            
        });
    };

    return(
        <div>
            <Layout>

                {/* 🔹 Floating Message */}
                {message && (
                    <div style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: msgType === "success" ? "green" :
                                            msgType === "delete" ? "red" : "#6c757d",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px"
                        }}>
                        {message}
                    </div>
                )}


                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>All Customers</h2>

                    <button onClick={() => {setShowForm(!showForm);
                                        resetForm();
                    }}    
                        style={{
                            backgroundColor: showForm ? "#dc3545" : "#28a745",
                            color: "white",
                            padding: "8px 14px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}>
                        {showForm ? "Cancel" : "+ Add New Customer"}
                    </button>
                </div>

                {/* form */}
                    {showForm && (
                        <div>
                        <div style={{
                                width: "400px",
                                marginTop: "20px",
                                padding: "15px",
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                backgroundColor: "#f9f9f9"
                            }}>   
                        <form  onSubmit={handleSubmit}>
                            <h3>Add Customer</h3>

                            <input style={{ border: errors.CustomerName ? "2px solid red" : "" }} placeholder="Customer Name"
                                value={CustomerName}
                                onChange={(e) => setCustomerName(e.target.value)} />
                                {errors.CustomerName && <p style={{ color: "red" }}>{errors.CustomerName}</p>}

                            <input style={{ border: errors.ContactPerson ? "2px solid red" : "" }} placeholder="Contact Person"
                                value={ContactPerson}
                                onChange={(e) => setContactPerson(e.target.value)} />
                                {errors.ContactPerson && <p style={{ color: "red" }}>{errors.ContactPerson}</p>}

                            <input style={{ border: errors.Phone ? "2px solid red" : "" }} placeholder="Phone"
                                value={Phone}
                                onChange={(e) => setPhone(e.target.value)} />
                                {errors.Phone && <p style={{ color: "red" }}>{errors.Phone}</p>}

                            <input style={{ border: errors.Email ? "2px solid red" : "" }} placeholder="Email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)} />
                                {errors.Email && <p style={{ color: "red" }}>{errors.Email}</p>}

                            <input style={{ border: errors.Address ? "2px solid red" : "" }} placeholder="Address"
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)} />
                                {errors.Address && <p style={{ color: "red" }}>{errors.Address}</p>}

                            <input style={{ border: errors.CustomerType ? "2px solid red" : "" }} placeholder="Customer Type"
                                value={CustomerType}
                                onChange={(e) => setCustomerType(e.target.value)} />
                                {errors.CustomerType && <p style={{ color: "red" }}>{errors.CustomerType}</p>}

                            <button type="submit">Add Customer</button>
                        </form>
                        </div>
                    </div>
                    
                )}
                        
                    

                    {/* TABLE */}
            <table border="1"  style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px"}}>
                 <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                        <th  style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>ID</th>
                        <th  style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Name</th>
                        <th  style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Contact</th>
                        <th  style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Phone</th>
                        <th  style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Email</th>
                        <th  style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Type</th>
                        <th  style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((c) => (
                        <tr key={c.CustomerID}>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{c.CustomerID}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{c.CustomerName}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{c.ContactPerson}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{c.Phone}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{c.Email}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{c.CustomerType}</td>
                            <td>
                                <button onClick={() => window.location.href = `/customers/edit/${c.CustomerID}`}
                                    style={{ backgroundColor: "#007bff", color: "white",border: "none", padding: "5px 10px", borderRadius: "4px", marginRight: "5px",
                                            cursor: "pointer"}}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(c.CustomerID)}
                                     style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer"}}>
                                    
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </Layout>
        </div>
    );

    }
export default Customers;


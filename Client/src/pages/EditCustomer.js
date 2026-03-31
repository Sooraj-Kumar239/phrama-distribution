import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";


function EditCustomer() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [CustomerName, setCustomerName] = useState("");
    const [ContactPerson, setContactPerson] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [CustomerType, setCustomerType] = useState("");
    // error state 
    const [errors, setErrors] = useState({});

    // load existing  data
    useEffect(() => {
        fetch(`http://localhost:3003/customers/${id}`)
            .then(res => res.json())
            .then(data => {
                setCustomerName(data.CustomerName);
                setContactPerson(data.ContactPerson);
                setPhone(data.Phone);
                setEmail(data.Email);
                setAddress(data.Address);
                setCustomerType(data.CustomerType);
            });
    }, [id]);

    // UPDATE customer
    const updateCustomer = () => {
        // form validation
    const newErrors = {};

    if (!CustomerName.trim()) newErrors.CustomerName = "Customer Name required";
    if (!ContactPerson.trim()) newErrors.ContactPerson = "Contact Person required";
    if (!Phone.trim()) newErrors.Phone = "Phone required";
    if (!Address.trim()) newErrors.Address = "Address required";
    if (!CustomerType.trim()) newErrors.CustomerType = "Customer Type required";

    // Email 
    if (Email && !/^\S+@\S+\.\S+$/.test(Email)) {
        newErrors.Email = "Invalid email";
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    // API call
    fetch(`http://localhost:3003/customers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
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
    .then(() => {
        navigate("/customers?msg=updated");
    });
    };


    //     fetch(`http://localhost:3003/customers/${id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             CustomerName,
    //             ContactPerson,
    //             Phone,
    //             Email,
    //             Address,
    //             CustomerType
    //         })
    //     })
    //     .then(res => res.text())
    //     .then(() => {
    //         window.location.href = "/customers?msg=updated";
    //     });
    // };

    return (
        <Layout>
            <div style={{
                width: "90%",
                margin: "40px auto",
                maxWidth: "500px",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}>
                <h2>Edit Customer</h2>

                    <label>Customer Name</label>
                    <input 
                        value={CustomerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        style={{ 
                            width: "100%", 
                            padding: "8px",
                            border: errors.CustomerName ? "2px solid red" : "1px solid #ccc"
                        }}
                    />
                    <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                        {errors.CustomerName}
                    </div>

                <label>Contact Person</label>
                <input 
                    value={ContactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    style={{
                        width: "100%",
                        marginBottom: "10px", 
                        border: errors.ContactPerson ? "2px solid red" : "1px solid #ccc",
                        padding: "8px" }}
                />
                <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                    {errors.ContactPerson}
                </div>    

                <label>Phone</label>
                <input 
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ 
                        width: "100%", 
                        padding: "8px",
                        border: errors.Phone ? "2px solid red" : "1px solid #ccc"
                    }}
                />
                <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                    {errors.Phone}
                </div>

                <label>Email</label>
                <input 
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ 
                        width: "100%", 
                        padding: "8px",
                        border: errors.Email ? "2px solid red" : "1px solid #ccc"
                    }}
                />
                <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                    {errors.Email}
                </div>

                <label>Address</label>
                <input 
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ 
                        width: "100%", 
                        padding: "8px",
                        border: errors.Address ? "2px solid red" : "1px solid #ccc"
                    }}
                />
                <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                    {errors.Address}
                </div>

                <label>Customer Type</label>
                    <input 
                        value={CustomerType}
                        onChange={(e) => setCustomerType(e.target.value)}
                        style={{ 
                            width: "100%", 
                            padding: "8px",
                            border: errors.CustomerType ? "2px solid red" : "1px solid #ccc"
                        }}
                    />
                    <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                        {errors.CustomerType}
                    </div>

                <button onClick={updateCustomer}
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
                    }}>
                    Update Customer
                </button>
            </div>
        </Layout>
    );
}

export default EditCustomer;
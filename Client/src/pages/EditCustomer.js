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
            window.location.href = "/customers?msg=updated";
        });
    };

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

                <label>Customer name</label>
                <input value={CustomerName} onChange={(e) => setCustomerName(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

                <label>Contact Person</label>
                <input value={ContactPerson} onChange={(e) => setContactPerson(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

                <label>Phone</label>
                <input value={Phone} onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

                <label>Email</label>
                <input value={Email} onChange={(e) => setEmail(e.target.value)}/>

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
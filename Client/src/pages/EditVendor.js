import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import API_BASE_URL from "../config";


function EditVendor() {

    const { id } = useParams();

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");

    // GET vendor data
    useEffect(() => {
        fetch(`${API_BASE_URL}/vendors/${id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.VendorName);
                setContact(data.ContactPerson);
                setEmail(data.Email);
            });
    }, [id]);

    // UPDATE vendor
    const updateVendor = () => {
        fetch(`${API_BASE_URL}/vendors/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                VendorName: name,
                ContactPerson: contact,
                Email: email
            })
        })
        .then(res => res.text())
        .then(() => {
            window.location.href = "/vendors?msg=updated";
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
                <h2>Edit Vendor</h2>

                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

                <label>Contact Person</label>
                <input value={contact} onChange={(e) => setContact(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />

                <button onClick={updateVendor}
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
                    Update Vendor
                </button>
            </div>
        </Layout>
    );
}

export default EditVendor;
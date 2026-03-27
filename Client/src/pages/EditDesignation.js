import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";

function EditDesignation() {

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [baseSalary, setBaseSalary] = useState("");
    const navigate = useNavigate();

        // fetch data by id
    useEffect(() => {
        fetch(`http://localhost:3003/designation/${id}`)
            .then(res => res.json())
            .then(data => {
                
                setTitle(data.Title);
                setBaseSalary(data.BaseSalary);
            });
    }, [id]);
// update
    const updateDesignation = () => {
        fetch(`http://localhost:3003/designation/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Title: title,
                BaseSalary: baseSalary
            })
        })
        .then(res => res.text())
        .then(() => {
            navigate("/designations?msg=updated");
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
                borderRadius: "10px"
            }}>

                <h2>Edit Designation</h2>

                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />

                <input
                    placeholder="Base Salary"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />

                <button onClick={updateDesignation}>
                    Update Designation
                </button>

            </div>
        </Layout>
    );
}

export default EditDesignation;
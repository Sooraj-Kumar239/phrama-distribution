import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";

function EditDesignation() {

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [baseSalary, setBaseSalary] = useState("");
    const navigate = useNavigate();
    // error state 
    const [errors, setErrors] = useState({});

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
        // validation
        const newErrors = {};

        if (!title.trim()) newErrors.title = "Title required";
        if (!baseSalary.toString().trim()) newErrors.baseSalary = "Base Salary required";
            else if (isNaN(baseSalary)) newErrors.baseSalary = "Must be number";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                 return;
             }
        // end validation


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
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setErrors({ ...errors, title: "" });
                    }}
                    style={{
                        width: "100%",
                        marginBottom: "10px",
                        padding: "8px",
                        border: errors.title ? "2px solid red" : "1px solid #ccc"
                    }}
                />
                <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                    {errors.title}
                </div>

                <input
                    placeholder="Base Salary"
                    value={baseSalary}
                   onChange={(e) => {
                        setBaseSalary(e.target.value);
                        setErrors({ ...errors, baseSalary: "" });
                        }}
                        style={{
                            width: "100%",
                            marginBottom: "10px",
                            padding: "8px",
                            border: errors.baseSalary ? "2px solid red" : "1px solid #ccc"
                    }}
                />
                <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                     {errors.baseSalary}
                </div>

                <button type="button" onClick={updateDesignation}>
                    Update Designation
                </button>

            </div>
        </Layout>
    );
}

export default EditDesignation;
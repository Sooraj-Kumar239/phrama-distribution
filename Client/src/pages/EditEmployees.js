import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import API_BASE_URL from "../config";

function EmployeeEdit() {

    const { id } = useParams();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [designationId, setDesignationId] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isActive, setIsActive] = useState("");

    const [designations, setDesignations] = useState([]);

    // fetch employee + designation
    useEffect(() => {

        // employee data
        fetch(`${API_BASE_URL}/employees/${id}`)
            .then(res => res.json())
            .then(data => {
                const emp = Array.isArray(data) ? data[0] : data;

                setFullName(emp.FullName || "");
                setEmail(emp.Email || "");
                setPhone(emp.PhoneNumber || "");
                setDesignationId(emp.DesignationID || "");
                setHireDate(emp.HireDate?.split("T")[0] || "");
                setEndDate(emp.EndDate?.split("T")[0] || "");
                setIsActive(emp.IsActive || "");
            });

        // designation dropdown
        fetch(`${API_BASE_URL}/designation`)
            .then(res => res.json())
            .then(data => setDesignations(data));

    }, [id]);

    // update
    const updateEmployee = () => {
        fetch(`${API_BASE_URL}/employees/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                FullName: fullName,
                Email: email,
                PhoneNumber: phone,
                DesignationID: designationId,
                HireDate: hireDate,
                EndDate: endDate,
                IsActive: isActive
            })
        })
        .then(() => {
            window.location.href = "/employees?msg=updated";
        });
    };

    return (
        <Layout>
            <div style={{ width: "400px", margin: "40px auto" }}>

                <h2>Edit Employee</h2>

                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Name" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />

                <select value={designationId} onChange={(e) => setDesignationId(e.target.value)}>
                    <option value="">Select</option>
                    {designations.map(d => (
                        <option key={d.DesignationID} value={d.DesignationID}>
                            {d.Title}
                        </option>
                    ))}
                </select>

                <input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <input value={isActive} onChange={(e) => setIsActive(e.target.value)} placeholder="1 or 0" />

                <button onClick={updateEmployee}>Update</button>

            </div>
        </Layout>
    );
}

export default EmployeeEdit;
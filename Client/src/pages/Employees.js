import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Employees() {

    // ✅ States
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [designationId, setDesignationId] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isActive, setIsActive] = useState("");

    const [employees, setEmployees] = useState([]);
    const [designations, setDesignations] = useState([]);

    const [message, setMessage] = useState("");
    const [msgType, setMsgType] = useState("");

    //  Styling
    const inputStyle = {
        width: "15%",
        padding: "10px",
        marginBottom: "10px",
        marginRight: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    };

    const addBtn = {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    };
    
    const fetchDesignations = () => {
    fetch("http://localhost:3003/designation")
        .then(res => res.json())
        .then(data => setDesignations(data))
        .catch(err => console.log(err));
    };


    useEffect(() => {
    fetchEmployees();
    fetchDesignations(); 
    }, []);

    //  Fetch Employees
    const fetchEmployees = () => {
        fetch("http://localhost:3003/employees")
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => console.log(err));
    };

   

    //  Add Employee
    const addEmployee = () => {
        fetch("http://localhost:3003/employees", {
            method: "POST",
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
            .then(res => res.text())
            .then(() => {
            setMessage("Employee Added Successfully");
            setMsgType("success");

            // clear form
            setFullName("");
            setEmail("");
            setPhone("");
            setDesignationId("");
            setHireDate("");
            setEndDate("");
            setIsActive("");

            fetchEmployees();

            setTimeout(() => setMessage(""), 3000);
        })
            .catch(err => console.log(err));
    };

            // Delete Employee
            const deleteEmployee = (id) => {
                fetch(`http://localhost:3003/employees/${id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    setMessage("Employee Deleted");
                    setMsgType("delete");
                    fetchEmployees();
                    setTimeout(() => setMessage(""), 3000);
                })
                    .catch(err => console.log(err));
            };

                return (
                    <Layout>
                        <div>

                            {/* Message */}
                            {message && (
                                <div style={{
                                    position: "fixed",
                                    bottom: "20px",
                                    right: "20px",
                                    backgroundColor:
                                    msgType === "success" ? "green" :
                                    msgType === "delete" ? "red" : "#007bff",
                                    color: "white",
                                    padding: "10px",
                                    borderRadius: "5px"
                                    }}>
                                    {message}
                                    </div>
                                    )}

                                    <h3>Add Employee</h3>

                                    {/* Form */}
                                    <input style={inputStyle} placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    <input style={inputStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input style={inputStyle} placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <select style={inputStyle} value={designationId} onChange={(e) => setDesignationId(e.target.value)}>
                                        <option value="">Select Designation</option>

                                        {designations.map((d) => (
                                        <option key={d.DesignationID} value={d.DesignationID}>
                                        {d.Title}
                                        </option>
                                        ))}
                                    </select>
                                        <input style={inputStyle} type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                                        <input style={inputStyle} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                            <input style={inputStyle} placeholder="Is Active (1/0)" value={isActive} onChange={(e) => setIsActive(e.target.value)} />

                                            <br />
                                                <button style={addBtn} onClick={addEmployee}>
                                            Add Employee
                                            </button>

                                            <h2>All Employees</h2>

                                         {/* Table */}
                                            <table border="1" cellPadding="10">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Designation</th>
                                                        <th>Hire Date</th>
                                                        <th>End Date</th>
                                                        <th>Status</th>
                                                        <th colSpan={2}>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {employees.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="8">No data found</td>
                                                        </tr>
                                                    ) : (
                                                        employees.map((e) => (
                                                            <tr key={e.EmployeeID}>
                                                                <td>{e.FullName}</td>
                                                                <td>{e.Email}</td>
                                                                <td>{e.PhoneNumber}</td>
                                                                <td>{e.DesignationName}</td>
                                                                <td>{e.HireDate}</td>
                                                                <td>{e.EndDate}</td>
                                                                <td>{e.IsActive}</td>
                                                                <td>
                                                                    <button
                                                                    onClick={() => window.location.href = `/edit/${e.EmployeeID}`}
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
                                                                        onClick={() => deleteEmployee(e.EmployeeID)}
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
                        </Layout>
    );
}

export default Employees;
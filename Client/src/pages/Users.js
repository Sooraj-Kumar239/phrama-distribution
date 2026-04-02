import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
// import { use } from "../../../Server/Controllers/authController";
function Users(){
    const [employees, setEmployees] = useState([]);

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    

    // states kyu?
    const [EmployeeID, setEmployeeId] = useState("");
    const [username, setUsername] = useState("");
    const [PasswordH, setPassword] = useState("");
    const [role, setrole] = useState("");
    
    
    // message show when data inserted 
    const [message, setMessage] = useState("");
    //message show when data row deleted
    const [msgType, setMsgType] = useState("");
    // for data edit and show update
    // const [editId, setEditId] = useState(null);
    // styling
    const inputStyle = {
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    };

    const addBtn = {
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
    };

    // fetch employee
    const fetchEmployees = () => {
        fetch("http://localhost:3003/employees")
        .then(res => res.json())
        .then(data => setEmployees(data))
        .catch(err => console.log(err));
    };
    // end fetch employee

    const fetchUsers = () => {
    fetch("http://localhost:3003/users")
        .then(res => res.json())
        .then(data => {setUsers(data);
        })
        .catch(err => console.log(err));
    };

        useEffect(() => {
            fetchUsers();
            fetchEmployees();
            const params = new URLSearchParams(window.location.search);
            const msg = params.get("msg");
            //  console.log("MSG:", msg); 

            if (msg === "updated") {
                setMessage("UserUpdated Successfully");
                setMsgType("update");

                setTimeout(() => {
                setMessage("");
                setMsgType("");
                }, 3000);
             }

        }, []);
   
    const deleteUser = (id) => {
        fetch(`http://localhost:3003/users/${id}`, {
        method: "DELETE"
        })
        .then(res => res.text())
        .then(data => {
        setMessage("User Deleted Successfully");
        setMsgType("delete"); 
        fetchUsers();

        setTimeout(() => {
            setMessage("");
        }, 3000);
        })
        .catch(err => console.log(err));
    };


    const addUser = () => {
        fetch("http://localhost:3003/users", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
        
            body: JSON.stringify
            ({
                EmployeeID  : EmployeeID,
                username    : username,
                PasswordH   : PasswordH,
                role        : role,
               
            })
        })
            .then(res => res.text())
                .then(data => {
                            setMessage("User Added Successfully");
                            setMsgType("success");
                            // to cleAR form 
                            setEmployeeId("");
                            setUsername("");
                            setPassword("");
                            setrole("");
                                
                            // referesh the list
                            fetchUsers();
                            setTimeout(() => {
                            setMessage("");
                            }, 3000); 
                })
                            .catch(err => console.log(err));
        };
                

        return (
            <Layout>
                <div>

                    {/* <h1>Dashboard</h1> */}
                    {message && (
                        <div style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px",
                            backgroundColor: msgType === "success" ? "green":
                                         msgType === "delete"  ? "red" :
                                         msgType === "update"  ? "#007bff": "#6c757d",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "5px"
                            }}>
                                    {message}
                        </div>
                    )}
                            <h3>Add User</h3>
                            
                            {/* <input style={inputStyle} placeholder="employeeId" onChange={(u) => setEmployeeId(u.target.value)} /> */}
                            {/* selct optio start */}
                            <select 
                                    style={inputStyle} 
                                    value={EmployeeID}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                >
                                    <option value="">Select Employee</option>
                                        {employees.map(emp => (
                                        <option key={emp.EmployeeID} value={emp.EmployeeID}>
                                            {emp.FullName}
                                        </option>
                                    ))}
                            </select>
                            {/* select end */}
                            <input
                                style={inputStyle} 
                                value={username}
                                placeholder="User Name"
                                onChange={(u) => setUsername(u.target.value)}
                            />

                            <input
                                style={inputStyle} 
                                value={PasswordH}
                                placeholder="password" onChange={(u) => setPassword(u.target.value)}
                            />
                            
                            {/* <input style={inputStyle} placeholder="role" type="text" onChange={(u) => setrole(u.target.value)} /> */}
                            {/* role start */}
                                        <select 
                                                style={inputStyle} 
                                                value={role}
                                                onChange={(e) => setrole(e.target.value)}
                                            >
                                                <option value="">Select Role</option>
                                                <option value="Admin">Admin</option>
                                                <option value="HR">HR</option>
                                                <option value="IT">IT Support</option>
                                            </select>
                            {/* role end */}
                            
                            
                            <button style={addBtn} onClick={addUser}>Add User</button>

                            <h2>All USer</h2>
                            <table border="1" cellPadding="10">
                                <thead>
                                    <tr>
                                        <th>User Id</th>
                                        <th>Employee ID</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>Role</th>
                                        <th colSpan="2">Action</th>
                                     </tr>
                                </thead>

                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan="6">No data found</td>
                                        </tr>
                                    ) : (
                                        users.map((u) => (
                                                <tr key={u.UserID}>
                                                <td>{u.UserID}</td>
                                                <td>{u.EmployeeID}</td>
                                                <td>{u.Username}</td>
                                                <td>{u.PasswordH}</td>
                                                <td>{u.role}</td>
                                                <td>
                                    <button
                                        onClick={() => navigate(`/users/edit/${u.UserID}`)}
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
                                    onClick={() => deleteUser(u.UserID)}
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

export default Users;
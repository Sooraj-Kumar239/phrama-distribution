import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

function UserEdit() {

    const { id } = useParams();

    const [employeeId, setEmployeeId] = useState("");
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    //  Fetch user data (auto-fill form)
    useEffect(() => {
        fetch(`http://localhost:3003/users/${id}`)
            .then(res => res.json())
            .then(data => {
                // Since the API returns an array, we must use data[0]
                if (data && data.length > 0) {
                    const user = data[0];

                    setEmployeeId(user.EmployeeID || "");
                    setUserId(user.UserID || "");
                    setUsername(user.Username || "");
                    setPassword(user.PasswordH || user.Password || "");
                    setRole(user.role || user.Role || "");
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    // Update user
    const updateUser = () => {
        fetch(`http://localhost:3003/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UserId: userId,
                EmployeeID: employeeId,
                Username: username,
                Password: password,
                Role: role
            })
        })
        .then(res => res.text())
        .then(() => {
            window.location.href = "/users?msg=updated";
        })
        .catch(err => console.log(err));
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

                <h2 style={{ marginBottom: "20px" }}>Edit User</h2>

                <label>User ID</label>
                <input
                    disabled
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />

                <label>Employee ID</label>
                <input
                    disabled
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />

                <label>Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />

                <label>Role</label>
                <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />

                <button
                    onClick={updateUser}
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
                    }}
                >
                    Update User
                </button>

            </div>
        </Layout>
    );
}

export default UserEdit;
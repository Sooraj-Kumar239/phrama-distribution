import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../config";

function Users() {
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Form States
  const [EmployeeID, setEmployeeId] = useState("");
  const [username, setUsername] = useState("");
  const [PasswordH, setPassword] = useState("");
  const [role, setrole] = useState("");

  // --- Data Fetching ---
  const fetchEmployees = () => {
    fetch(`${API_BASE_URL}/employees`)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Employee Fetch Error:", err));
  };

  const fetchUsers = () => {
    fetch(`${API_BASE_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Users Data from API:", data); // CHECK YOUR CONSOLE FOR FIELD NAMES
        setUsers(data);
      })
      .catch((err) => console.error("User Fetch Error:", err));
  };

  useEffect(() => {
    fetchUsers();
    fetchEmployees();

    const params = new URLSearchParams(window.location.search);
    if (params.get("msg") === "updated") {
      toast.info("User Updated Successfully! 🔄");
    }
  }, []);

  // --- Actions ---
  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    fetch(`${API_BASE_URL}/api/users/${id}`, { method: "DELETE" })
      .then(() => {
        toast.error("User Deleted! ");
        fetchUsers();
      })
      .catch((err) => console.error(err));
  };

  const addUser = () => {
    if (!EmployeeID || !username || !PasswordH || !role) {
      toast.warning("Please fill all fields! ❗");
      return;
    }

    fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ EmployeeID, username, PasswordH, role }),
    })
      .then(() => {
        toast.success("User Added Successfully! ✨");
        setEmployeeId("");
        setUsername("");
        setPassword("");
        setrole("");
        fetchUsers();
      })
      .catch((err) => console.error(err));
  };

  // --- Styled Components ---
  const styles = {
    container: { padding: "30px", backgroundColor: "#f4f7f6", minHeight: "100vh" },
    card: { background: "#fff", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "25px", marginBottom: "30px" },
    input: { width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ced4da", outline: "none" },
    gridHeader: { display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1.5fr", background: "#343a40", color: "#fff", padding: "12px 15px", fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", borderRadius: "5px 5px 0 0" },
    gridRow: { display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1.5fr", padding: "12px 15px", borderBottom: "1px solid #eee", alignItems: "center", backgroundColor: "#fff" },
    btnPrimary: { background: "#007bff", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: "600", width: "100%", marginTop: "10px" },
    btnEdit: { background: "#ffc107", border: "none", padding: "6px 12px", borderRadius: "4px", marginRight: "5px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
    btnDelete: { background: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
    label: { fontSize: "13px", fontWeight: "bold", color: "#666", marginBottom: "5px", display: "block" }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={{ marginBottom: "20px", color: "#333", fontWeight: "700" }}>User Management</h2>

        {/* ADD USER CARD */}
        <div style={styles.card}>
          <h4 style={{ marginBottom: "20px", color: "#007bff", borderBottom: "2px solid #f0f2f5", paddingBottom: "10px" }}>Add New User</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
            <div>
              <label style={styles.label}>Employee</label>
              <select style={styles.input} value={EmployeeID} onChange={(e) => setEmployeeId(e.target.value)}>
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.EmployeeID} value={emp.EmployeeID}>{emp.FullName || emp.fullname}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={styles.label}>Username</label>
              <input style={styles.input} value={username} placeholder="Enter Username" onChange={(u) => setUsername(u.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Password</label>
              <input type="password" style={styles.input} value={PasswordH} placeholder="Enter Password" onChange={(u) => setPassword(u.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Role</label>
              <select style={styles.input} value={role} onChange={(e) => setrole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="HR">HR</option>
                <option value="IT">IT Support</option>
              </select>
            </div>
          </div>
          <button style={styles.btnPrimary} onClick={addUser}>Create User Account</button>
        </div>

        {/* ALL USERS LIST CARD */}
        <div style={styles.card}>
          <h4 style={{ marginBottom: "20px", color: "#555" }}>Existing System Users</h4>
          <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #dee2e6" }}>
            <div style={styles.gridHeader}>
              <div>Emp ID</div>
              <div>Username</div>
              <div>Role</div>
              <div>Status</div>
              <div style={{ textAlign: "center" }}>Actions</div>
            </div>

            {users.length > 0 ? (
              users.map((user, index) => (
                <div key={user.UserID || index} style={styles.gridRow}>
                  {/* If fields are empty, check if your DB uses lowercase names like user.employeeid */}
                  <div>{user.EmployeeID || user.employeeid || "N/A"}</div>
                  <div style={{ fontWeight: "600", color: "#333" }}>{user.username || user.Username || "Unknown"}</div>
                  <div>
                    <span style={{ background: "#e9ecef", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "600" }}>
                      {user.role || user.Role || "User"}
                    </span>
                  </div>
                  <div style={{ color: "#28a745", fontSize: "12px", fontWeight: "bold" }}>Active</div>
                  <div style={{ textAlign: "center" }}>
                    <button style={styles.btnEdit} onClick={() => navigate(`/users/edit/${user.UserID || user.userid}`)}>Edit</button>
                    <button style={styles.btnDelete} onClick={() => deleteUser(user.UserID || user.userid)}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>No users found.</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;

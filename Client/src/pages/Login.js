    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { toast } from "react-toastify";

    function Login() {

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [errors, setErrors] = useState({});

        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);

        const login = () => {

        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username required";
        }

        if (!password.trim()) {
            newErrors.password = "Password required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        fetch("https://pharma-distribution-sko13-arfmd5c3fdgvgpcv.spaincentral-01.azurewebsites.net/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
    
        .then(res => res.json())
        .then(data => {
            console.log("LOGIN RESPONSE:", data);  // test
            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/dashboard");
            } else {
                toast.info("Invalid login");
            }
        })
        .catch(() => {
            toast.info("Server error");
        })
        .finally(() => {
        setLoading(false);  
    });

    };

        return (
            <div style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(to right, #4facfe, #00f2fe)"
            }}>

                <div style={{
                    width: "350px",
                    padding: "30px",
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    textAlign: "center"
                }}>

                    <h2 style={{ marginBottom: "20px" }}>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors({ ...errors, username: "" });
                        }}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "5px",
                            borderRadius: "6px",
                            border: errors.username ? "2px solid red" : "1px solid #ccc"
                        }}
                    />

                    <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                        {errors.username}
                    </div>
                    {/* username section closed */}

                    {/* password section start */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({ ...errors, password: "" });
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") login();
                        }}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "5px",
                            borderRadius: "6px",
                            border: errors.password ? "2px solid red" : "1px solid #ccc"
                        }}
                    />

                    <div style={{ color: "red", fontSize: "12px", height: "14px" }}>
                        {errors.password}
                    </div>

                    {/* button section satrt */}
                    <button
                        onClick={login} disabled={loading}
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "#007bff",  
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                        >
                        Login
                    </button>
                </div>
            </div>
        );
    }
    export default Login;
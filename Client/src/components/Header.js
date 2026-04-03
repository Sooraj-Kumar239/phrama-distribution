import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Header() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const [userOpen, setUserOpen] = useState(false);
    const [productOpen, setProductOpen] = useState(false);
    const [employeesOpen, setEmployeesOpen] = useState(false);
    const [designationOpen, setDesignationOpen] = useState(false);
    const [vendorsOpen, setVendorsOpen] =useState(false);
    const [customersOpen, setCustomersOpen] =useState(false);
    // state for purchase
    const [purchaseOpen, setPurchaseOpen] = useState(false);
    // state for purchaseLines
    

    return (
        <div style={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    backgroundColor: "#333",
                    padding: "15px 40px",
                    color: "white",
                    zIndex: 1000,
                    display: "flex",
                    gap: "20px",
                    alignItems: "center"
                }}>

            {/* Logo */}
            <span style={{ fontWeight: "bold" }}>
                Fast Enterprises
            </span>

            {/* Dashboard */}
            <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/dashboard")}
            >
                Dashboard
            </span>
                {/* designations */}
                 <span style={{ position: "relative" }}>
                <button
                        onClick={() => navigate("/designations")}
                        style={{
                        background: "none",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                    >
                        Manage Designation
                </button>
                </span>
                {/* users */}
                {/* users Dropdown */}
                 <span style={{ position: "relative" }}>
                <button
                    onClick={() => setUserOpen(!userOpen)}
                    style={{
                        background: "none",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Manage Users 
                </button>

                {userOpen &&  (
                    <div style={{
                        position: "absolute",
                        backgroundColor: "white",
                        color: "black",
                        marginTop: "10px",
                        padding: "10px",
                        borderRadius: "5px"
                    }}>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => window.location.href = "/users"}
                        >
                            All users
                        </div>
                    </div>
                )}
            </span>

            {/* Products Dropdown */}
            <span style={{ position: "relative" }}>
                <button
                
            // const [employeessOpen, setEmployeesOpen] = useState(false);

                  onClick={() => setProductOpen(!productOpen)}
                    style={{
                        background: "none",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Products
                </button>

                {productOpen && (
                    <div style={{
                        position: "absolute",
                        backgroundColor: "white",
                        color: "black",
                        marginTop: "10px",
                        padding: "10px",
                        borderRadius: "5px"
                    }}>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => window.location.href = "/products"}
                        >
                            All Products
                        </div>
                    </div>
                )}
            </span>
            {/* employees  */}
            <span style={{ position: "relative" }}>
                <button
                  onClick={() => setEmployeesOpen(!employeesOpen)}
                    style={{
                        background: "none",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Employees
                </button>

                {employeesOpen && (
                    <div style={{
                        position: "absolute",
                        backgroundColor: "white",
                        color: "black",
                        marginTop: "10px",
                        padding: "10px",
                        borderRadius: "5px"
                    }}>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => window.location.href = "/employees"}
                        >
                            All Employees
                        </div>
                    </div>
                )}
            </span>
            {/* vendors */}
             <span style={{ position: "relative" }}>
                <button
                  onClick={() => setVendorsOpen(!vendorsOpen)}
                    style={{
                        background: "none",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Distributors
                </button>

                {vendorsOpen && (
                    <div style={{
                        position: "absolute",
                        backgroundColor: "white",
                        color: "black",
                        marginTop: "10px",
                        padding: "10px",
                        borderRadius: "5px"
                    }}>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => window.location.href = "/vendors"}
                        >
                            All Vendors
                        </div>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => window.location.href = "/vendors"}
                        >
                            purchase Order
                        </div>
                    </div>
                )}
             </span>
             {/* customers */}
            <span style={{ position: "relative" }}>
                <button
                    onClick={() => setCustomersOpen(!customersOpen)}
                        style={{
                            background  : "none",
                            color       : "white",
                            border      : "none",
                            cursor      : "pointer"
                        }}
                        >
                        Customers
                    </button>

                    {customersOpen && (
                        <div style={{
                            position        : "absolute",
                            backgroundColor : "white",
                            color           : "black",
                            marginTop       : "10px",
                            padding         : "10px",
                            borderRadius    : "5px"
                        }}>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => window.location.href = "/customers"}
                            >
                            All Customers
                            </div>
                        </div>
                    )}
                </span>

                    {/* purchase */}
                     <span style={{ position: "relative" }}>
                <button
                    onClick={() => setPurchaseOpen(!purchaseOpen)}
                        style={{
                            background  : "none",
                            color       : "white",
                            border      : "none",
                            cursor      : "pointer"
                        }}
                        >
                        Purchase
                    </button>

                    {purchaseOpen && (
                        <div style={{
                            position        : "absolute",
                            backgroundColor : "white",
                            color           : "black",
                            marginTop       : "10px",
                            padding         : "10px",
                            borderRadius    : "5px"
                        }}>
                            <div
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate ("/purchase-order")}
                                >
                                Purchse Orders
                            </div>

                            <div
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate ("/purchase-lines")}
                                >
                                Purchse Lines
                            </div>
                        </div>
                    )}
                </span>

                    {/*  */}
                <div style={{
                    marginLeft  : "auto",
                    marginRight :"20px",
                    display     : "flex",
                    alignItems  : "center",
                    gap         : "15px"
                }}>

                {/* Username */}
                <span>
                    Welcome, {user?.username || "User"} 
                </span>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
            
                    style={{
                        background  : "#dc3545",
                        color       : "white",
                        border      : "none",
                        padding     : "15px 40px",
                        borderRadius: "5px",
                        cursor      : "pointer"
                    }}
                    >
                    Logout
                </button>

        </div>
        </div>

        
    );
}

export default Header;
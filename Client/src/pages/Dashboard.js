import { useState } from "react";
import Layout from "../components/Layout";

function Dashboard() {
    const [open, setOpen] = useState(false);

    return (
        <Layout>
                <div style={{
                    width: "100%",
                    height: "170px",   
                    background: "linear-gradient(to right, #007bff, #00c6ff)",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    marginBottom: "20px"
                }}>

                    <h1 style={{ margin: 0 }}>
                        FAST ENTERPRISES
                    </h1>

                    <p style={{ margin: "5px 0" }}>
                        Pharmaceutical Distributors
                    </p>

                    <p style={{ margin: 0 }}>
                        "Caring for Health, Distributing with Trust"
                    </p>

                </div>
        </Layout>
    );
}

export default Dashboard;
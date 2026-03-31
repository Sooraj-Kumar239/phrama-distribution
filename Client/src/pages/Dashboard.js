import { useState, useEffect } from "react";
import Layout from "../components/Layout";






const boxStyle = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center"
};
function Dashboard() {
    // const [events, setEvents] = useState([]);
    // const [open, setOpen] = useState(false);
    const [employeeCount, setEmployeeCount] = useState(0);
    useEffect(() => {
                fetch("http://localhost:3003/dashboard/employee-count")
                    .then(res => res.json())
                    .then(data => {
                        console.log(data); // check ke liye
                        setEmployeeCount(data.activeEmployees);
                    })
                    .catch(err => console.log(err));
    }, []);

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

                <div style={{
                    display: "flex",
                    gap: "20px"
                }}>
                    {/*  LEFT SIDE - CALENDAR */}
                    <div style={{
                        width: "30%",
                        background: "#ffffff",
                        padding: "20px",
                        minHeight: "250px",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                    }}>
                        <h3 style={{ marginBottom: "10px" }}> Calendar</h3>
                        <iframe
                            src="https://calendar.google.com/calendar/embed?src=skood.2194%40gmail.com&ctz=Europe%2FDublin"
                            style={{ border: 0 }}
                            width="100%"
                            height="300"
                            frameBorder="0"
                            scrolling="no"
                        ></iframe>
                        {/* <p style={{ marginTop: "10px" }}>
                            Selected Date: {date.toDateString()}
                        </p> */}
                    </div>

                    {/*  RIGHT SIDE -  BOXES */}
                    <div style={{
                        width: "70%",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px"
                    }}>

                        <div style={boxStyle}>
                            Active Purchase Orders
                            <br />
                            <span style={{ fontSize: "24px", color: "#007bff" }}>50</span>
                        </div>

                        <div style={boxStyle}>
                            Active Sales Orders
                            <br />
                            <span style={{ fontSize: "24px", color: "#28a745" }}>20</span>
                        </div>

                        <div style={boxStyle}>
                            Active Vehicles
                            <br />
                            <span style={{ fontSize: "24px", color: "#ffc107" }}>6</span>
                        </div>

                        <div style={boxStyle}>
                             Active Employees
                            <br />
                                <span style={{ fontSize: "24px", color: "#dc3545" }}>
                                    {employeeCount}
                                </span>
                        </div>

                    </div>

                </div>
        </Layout>
    );
}

export default Dashboard;
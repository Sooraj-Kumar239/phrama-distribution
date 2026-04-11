    import { useState, useEffect } from "react";
    import Layout from "../components/Layout";
    
    import API_BASE_URL from "../config";
    console.log("Dashboard loaded");

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
        // for all vehicles number
        const [vehicleCount, setVehicleCount] = useState(0);
        // active / reveived products
        const [ProductCount, setProductCount] = useState(0);
        // active sale order
        const[SaleProductCount, setSaleProductCount] = useState(0);
        
        
        // active product api
        useEffect(() => {
            fetch(`${API_BASE_URL}/api/dashboard/product-count`)
            // fetch("https://pharma-distribution-sko13-arfmd5c3fdgvgpcv.spaincentral-01.azurewebsites.net/api/dashboard/product-count")
            // fetch("http://localhost:3003/dashboard/product-count")
                .then(res => res.json())
                .then(data =>{
                    console.log(data);
                    setProductCount(data.activeProducts);
                })
                .catch(err => console.log(err));
        },[]);

        // active sale count
        useEffect(() => {
            // fetch("http://localhost:3003/dashboard/sale-count")
        fetch(`${API_BASE_URL}/api/dashboard/sale-count`)
            // fetch("https://pharma-distribution-sko13-arfmd5c3fdgvgpcv.spaincentral-01.azurewebsites.net/api/dashboard/sale-count")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSaleProductCount(data.activeSaleOrder);
            })
            .catch(err => console.log(err));
        }, []);

        
        // 
        useEffect(() => {
                    // fetch("http://localhost:3003/dashboard/employee-count")
                fetch(`${API_BASE_URL}/api/dashboard/employee-count`)
                    .then(res => res.json())
                        .then(data => {
                            console.log(data); // check ke liye
                            setEmployeeCount(data.activeEmployees);
                        })
                        .catch(err => console.log(err));
        }, []);


        // all vehicles api 
        useEffect(() => {

            // fetch("http://localhost:3003/dashboard/vehicle-count")
            fetch(`${API_BASE_URL}/api/dashboard/vehicle-count`)
            // fetch("https://pharma-distribution-sko13-arfmd5c3fdgvgpcv.spaincentral-01.azurewebsites.net/api/dashboard/vehicle-count")
            .then(res => res.json())
            .then(data => {
                setVehicleCount(data.activeVehicles);
            });

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
                            gap: "20px",
                            // fontSize: "50px"
                        }}>

                            <div style={boxStyle}>
                            
                                <span style={{ fontSize: "20px" }}>Active Purchase Orders</span>
                                <br />
                                <span style={{ fontSize: "50px", color: "#007bff" }}>{ProductCount}</span>
                            </div>

                            <div style={boxStyle}>
                            
                                <span style={{ fontSize: "20px" }}>Active Sales Orders</span>
                                <br />
                                <span style={{ fontSize: "50px", color: "#28a745" }}>{SaleProductCount}</span>
                            </div>

                            <div style={boxStyle}>
                                
                                <span style={{ fontSize: "20px" }}>Active Vehicles</span>
                                <br />
                                <span style={{ fontSize: "45px", color: "#ffc107" }}>
                                    {vehicleCount}
                                </span>
                            </div>

                            <div style={boxStyle}>
                                <span style={{ fontSize: "20px" }}>Active Employees</span>
                                <br />
                                    <span style={{ fontSize: "50px", color: "#dc3545" }}>
                                        {employeeCount}
                                    </span>
                            </div>

                        </div>

                    </div>
            </Layout>
        );
    }
    export default Dashboard;
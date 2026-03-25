import Header from "./Header";

function Layout({ children }) {
    return (
        <div>
            <Header />

            {/* content neeche shift hoga */}
            <div style={{ marginTop: "80px", padding: "20px" }}>
                {children}
            </div>
        </div>
    );
}

export default Layout;
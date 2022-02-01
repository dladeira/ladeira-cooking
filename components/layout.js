import Navbar from './navbar.js'

function Component({ children }) {
    return (
        <div style={{ height: "100%" }}>
            <Navbar />
            <div style={{ height: "100%", paddingTop: "6vh"}}>
                {children}
            </div>
        </div>
    )
}

export default Component
import Navbar from './navbar.js'

function Component({ children }) {
    return (
        <div style={{ height: "100%" }}>
            <Navbar />
            {children}
        </div>
    )
}

export default Component
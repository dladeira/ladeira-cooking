import Layout from '../components/layout.js'
import '../styles/globals.scss'

function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default App

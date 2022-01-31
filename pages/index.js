import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/jumbotron.module.scss'

function Page() {
    return (
        <Jumbotron title="Ladeira Cooking" description="Your trusted cooking website" />
    )
}

function Jumbotron({ title, description }) {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
                <div className={styles.logo}><Image src="/logo.svg" layout="fill" alt="Logo" /></div>
                <div className={styles.button}><Link href="/recipes">View Recipes</Link></div>
            </div>
        </div>
    )
}

export default Page
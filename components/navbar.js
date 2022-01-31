import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/navbar.module.scss'

function Component() {
    return (
        <div className={styles.container}>
            <div className={styles.brand}>
                <Link href="/">
                    <a>
                        <Image src="/logo.svg" alt="Logo" width={45} height={45} />
                    </a>
                </Link>
            </div>
            <NavItem text="Home" location="/" />
            <NavItem text="Recipes" location="/recipes" />
        </div>
    )
}

function NavItem({ text, location }) {
    return (
        <div className={styles.link}>
            <Link href={location}>
                <a>
                    {text}
                </a>
            </Link>
        </div>
    )
}

export default Component
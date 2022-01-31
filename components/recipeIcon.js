import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/recipeIcon.module.scss'

function Component({ name, iconPath }) {
    return (
        <div className={styles.container}>
            <div className={styles.image}><Image src={iconPath} alt={name} height={260} width={260} /></div>
            <div className={styles.title}>{name}</div>
            <div className={styles.button}><Link href="/recipes">View</Link></div>
        </div>
    )
}

export default Component
import Image from 'next/image'
import Link from 'next/link'
import Rating from './rating'

import styles from '../styles/recipeIcon.module.scss'

function Component({ title, iconPath, id, rating }) {
    return (
        <div className={styles.container}>
            <div className={styles.image}><Image src={iconPath} alt={title} height={260} width={260} /></div>
            <Rating rating={rating} />
            <div className={styles.title}>{title}</div>
            <Link href={"/recipes/" + id}><a className={styles.button}>View</a></Link>
        </div>
    )
}

export default Component
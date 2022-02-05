import styles from '../styles/rating.module.scss'

export default function Rating({ rating }) {
    return (
        <div className={styles.ratingContainer}>
            <div className={styles.rating} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 0 ? "fas" : "far")} fa-star"></i>` }} />
            <div className={styles.rating} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 1 ? "fas" : "far")} fa-star"></i>` }} />
            <div className={styles.rating} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 2 ? "fas" : "far")} fa-star"></i>` }} />
            <div className={styles.rating} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 3 ? "fas" : "far")} fa-star"></i>` }} />
            <div className={styles.rating} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 4 ? "fas" : "far")} fa-star"></i>` }} />
        </div>
    )
}
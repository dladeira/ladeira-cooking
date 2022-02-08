import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import dbConnect from '../../lib/dbConnect.js'
import Recipe from '../../models/recipe.js'
import Rating from '../../components/rating'

import styles from '../../styles/recipe.module.scss'

function Page({ title, steps, splashPath, ingredients, id, score, reviews, creationDate, editDate }) {

    return (
        <div className={styles.container}>
            <RecipeComponent id={id} title={title} steps={steps} splashPath={splashPath} ingredients={ingredients} rating={Math.round(score / reviews)} creationDate={creationDate} editDate={editDate} />
        </div>
    )
}

function RecipeComponent({ id, title, steps, splashPath, ingredients, rating, creationDate, editDate }) {
    return (
        <div className={styles.recipeContainer}>
            <div className={styles.dates}>Created on: {creationDate}<br />Last edit on: {editDate}</div>
            <Rating rating={rating} />
            <div className={styles.title}>{title}</div>
            <div className={styles.line} />
            <div className={styles.landingImage}><Image alt={"Icon"} src={splashPath} height={400} width={800} /></div>
            <div className={styles.content}>

                <Ingredients ingredients={ingredients} />

                {steps.map(step => {
                    return <Step key={steps.indexOf(step)} number={steps.indexOf(step)} text={step.text} image={step.image} />
                })}
            </div>
            <Review id={id} />
        </div>
    )
}

function Ingredients({ ingredients }) {
    return (
        <div className={styles.ingContainer}>
            <div className={styles.ingTitle}>Ingredients</div>

            <div className={styles.ings}>
                {ingredients.map(ing => {
                    return <div key={ingredients.indexOf(ing)} className={styles.ing}>- {ing}</div>
                })}
            </div>
        </div>
    )
}

function Step({ number, text, image }) {
    return (
        <div className={styles.stepContainer}>
            <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Step {number + 1}</div>
                <div className={styles.stepText}>{text}</div>
            </div>
            <div className={styles.stepImage}><Image priority={true} alt={"image"} src={image} height={400} width={400} /></div>
        </div>
    )
}

function Review({ id }) {
    const [cookies, setCookie] = useCookies()
    const [ghostRating, setGhostRating] = useState(0)

    function onStarHover(rating) {
        console.log(cookies)
        if (!cookies["rating-" + id] || cookies["rating-" + id] < 0)
            setGhostRating(rating)
    }

    function onStarClick() {
        if (cookies["rating-" + id] && cookies["rating-" + id] > 0) {
            submitRating(-ghostRating)
        } else {
            submitRating(ghostRating)
        }
    }

    function submitRating(rating) {
        setCookie("rating-" + id, rating, {
            path: "/",
            maxAge: 100000000000,
            sameSite: true
        })

        fetch("/api/setRating", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating: rating, id: id })
        })
    }

    useEffect(() => {
        if (cookies["rating-" + id]) {
            setGhostRating(cookies["rating-" + id])
        }
    }, [cookies, setGhostRating, id])

    return (
        <div className={styles.ratingWrapper}>
            <div className={styles.ratingText}>Rate this recipe</div>
            <div className={styles.ratingContainer}>
                <div className={styles.rating} onClick={onStarClick} dangerouslySetInnerHTML={{ __html: `<i class="${(ghostRating > 0 ? "fas" : "far")} fa-star"></i>` }} onMouseEnter={() => { onStarHover(1) }} onMouseLeave={() => { onStarHover(0) }} />
                <div className={styles.rating} onClick={onStarClick} dangerouslySetInnerHTML={{ __html: `<i class="${(ghostRating > 1 ? "fas" : "far")} fa-star"></i>` }} onMouseEnter={() => { onStarHover(2) }} onMouseLeave={() => { onStarHover(0) }} />
                <div className={styles.rating} onClick={onStarClick} dangerouslySetInnerHTML={{ __html: `<i class="${(ghostRating > 2 ? "fas" : "far")} fa-star"></i>` }} onMouseEnter={() => { onStarHover(3) }} onMouseLeave={() => { onStarHover(0) }} />
                <div className={styles.rating} onClick={onStarClick} dangerouslySetInnerHTML={{ __html: `<i class="${(ghostRating > 3 ? "fas" : "far")} fa-star"></i>` }} onMouseEnter={() => { onStarHover(4) }} onMouseLeave={() => { onStarHover(0) }} />
                <div className={styles.rating} onClick={onStarClick} dangerouslySetInnerHTML={{ __html: `<i class="${(ghostRating > 4 ? "fas" : "far")} fa-star"></i>` }} onMouseEnter={() => { onStarHover(5) }} onMouseLeave={() => { onStarHover(0) }} />
            </div>
        </div >
    )
}

export async function getServerSideProps(context) {
    await dbConnect()
    const recipe = await Recipe.findOne({ id: context.params.id })

    return {
        props: JSON.parse(JSON.stringify(recipe))
    }
}

export default Page
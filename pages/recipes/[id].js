import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import dbConnect from '../../lib/dbConnect.js'
import Recipe from '../../models/recipe.js'

import styles from '../../styles/recipe.module.scss'

function Page({ title, steps, splashPath, ingredients, id, score, reviews }) {

    return (
        <div className={styles.container}>
            <RecipeComponent id={id} title={title} steps={steps} splashPath={splashPath} ingredients={ingredients} rating={Math.round(score / reviews)} />
        </div>
    )
}

function RecipeComponent({ id, title, steps, splashPath, ingredients, rating }) {
    return (
        <div className={styles.recipeContainer}>
            <Score rating={rating} />
            <div className={styles.title}>{title}</div>
            <div className={styles.line} />
            <div className={styles.landingImage}><Image alt={"Icon"} src={splashPath} height={400} width={800} /></div>
            <div className={styles.content}>

                <Ingredients ingredients={ingredients} />

                {steps.map(step => {
                    return <Step key={steps.indexOf(step)} number={steps.indexOf(step)} text={step.text} image={step.image} />
                })}
            </div>
            <Rating id={id} />
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

function Score({ rating }) {
    return (
        <div className={styles.scoreContainer}>
            <div className={styles.score} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 0 ? "fas" : "far")} fa-star"></i>` }} />
            <div className={styles.score} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 1 ? "fas" : "far")} fa-star"></i>` }} />
            <div className={styles.score} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 2 ? "fas" : "far")} fa-star"></i>` }} />
            <div className={styles.score} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 3 ? "fas" : "far")} fa-star"></i>` }} />
            <div className={styles.score} dangerouslySetInnerHTML={{ __html: `<i class="${(rating > 4 ? "fas" : "far")} fa-star"></i>` }} />
        </div>
    )
}

function Rating({ id }) {
    const [cookies, setCookie] = useCookies()
    const [ghostRating, setGhostRating] = useState(0)

    function onStarHover(rating) {
        if (!cookies.rating || cookies.rating < 0)
            setGhostRating(rating)
    }

    function onStarClick() {
        if (cookies.rating && cookies.rating > 0) {
            submitRating(-ghostRating)
        } else {
            submitRating(ghostRating)
        }
    }

    function submitRating(rating) {
        setCookie("rating", rating, {
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
        if (cookies.rating) {
            console.log(cookies.rating)
            setGhostRating(cookies.rating)
        }
    }, [cookies, setGhostRating])

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
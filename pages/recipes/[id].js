import Image from 'next/image'
import dbConnect from '../../lib/dbConnect.js'
import Recipe from '../../models/recipe.js'

import styles from '../../styles/recipe.module.scss'

function Page({ title, steps, splashPath }) {

    return (
        <div className={styles.container}>
            <RecipeComponent title={title} steps={steps} splashPath={splashPath} />
        </div>
    )
}

function RecipeComponent({ title, steps, splashPath }) {
    return (
        <div className={styles.recipeContainer}>
            <div className={styles.title}>{title}</div>
            <div className={styles.line} />
            <div className={styles.landingImage}><Image alt={"Icon"} src={splashPath} height={400} width={800} /></div>
            <div className={styles.content}>{steps.map(step => {
                return <Step key={steps.indexOf(step)} number={steps.indexOf(step)} text={step.text} image={step.image} />
            })}</div>

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
            <div className={styles.stepImage}><Image alt={"image"} src={image} height={400} width={400} /></div>
        </div>
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
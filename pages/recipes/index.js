import dbConnect from '../../lib/dbConnect.js'
import Recipe from '../../models/recipe.js'
import RecipeIcon from '../../components/recipeIcon.js'

var bloqDescription = "Invented in 1984 the bloq czekoladowy still remains one of the most successful foods in the world. The bloq (blok czekoladowy in the language of origin) is a industrial masterpiece consisting of several carefully merged tastes. It reminds the taster of the taste of chocolate and makes them feel better. Thy shall remain alarmed tho, as consumption in large quantities might result in vomiting if prepared unproperly"

function Page({ recipes }) {

    return (
        <div>
            {recipes.map(recipe => {
                return <RecipeIcon rating={Math.round(recipe.score / recipe.reviews)} key={recipe.title} title={recipe.title} iconPath={recipe.iconPath} id={recipe.id} />
            })}
        </div>
    )
}

export async function getServerSideProps() {
    await dbConnect()
    const recipes = JSON.parse(JSON.stringify(await Recipe.find({})))

    return {
        props: {
            recipes: recipes
        }
    }
}

export default Page
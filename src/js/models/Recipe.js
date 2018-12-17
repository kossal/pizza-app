import axios from 'axios';

export default class Recipe {
    constructor(url, key, proxy, queryID) {
        this.url = url;
        this.key = key;
        this.proxy = proxy;
        this.queryID = queryID;
        this.call = `${this.proxy}${this.url}get?key=${this.key}&rId=${this.queryID}`;
        this.results;
    }
    async getRecipe() {
        try {
            const res = await axios(this.call);
            this.results = res.data.recipe;
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.recipeUrl = res.data.recipe.source_url; 
            this.ingredients = res.data.recipe.ingredients;
        }
        catch(err) {
            console.error(err);
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {

        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(curr => {

            // Uniform units
            let ingredient = curr.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // Remove parentheses
            ingredient.replace(/ *\([^\(]*\) */g, ' ');

            // Parse ingredientes into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = ingredient.findIndex(el2 => unitShort.includes(el2));

            return ingredient;

        });
        this.ingredients = newIngredients;
    }

}
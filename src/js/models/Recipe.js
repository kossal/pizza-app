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

            this.title = this.results.title;
            this.author = this.results.publisher;
            this.img = this.results.image_url;
            this.recipeUrl = this.results.source_url; 
            this.ingredients = this.results.ingredients;
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
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'g', 'kg'];

        const newIngredients = this.ingredients.map(curr => {

            // Uniform units
            let ingredient = curr.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // Remove parentheses
            ingredient = ingredient.replace(/\s*\([^\(]*\)\s*/g, ' ');

            // Parse ingredientes into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(curr2 => unitShort.includes(curr2));

            let objIng;
            if (unitIndex > -1) {
                //There is a unit
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                } 
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
                
            } else if (parseInt(arrIng[0], 10)) {
                //There is a number but no unit
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                //Ther is no unit and no number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;

        });
        this.ingredients = newIngredients;
    }

    updateServings (type) {
        // Servings
        const newServings = type === 'dec' ? this.servings--: this.servings++;

        // Ingredients
        this.ingredients.forEach(ing => {
            inc.count *= (newServings / this.servings);
        });

        this.servings = newServings;

    }

}
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import {elements, elemensStr, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {urlAPI, keyAPI, proxyCORS} from './api_settings';

const queryBase = [urlAPI, keyAPI, proxyCORS];

/* Global state of the app
    Search object
    Current recipe object
    Shopping list object
    Liked recipes
*/

const state = {};

const controlSearch = async () => {

    //1) Get query from view
    let queryStr = searchView.getInput();//TODO


    if(queryStr) {
        let query = [...queryBase, queryStr];

        // 2) New search object and add to state
        state.search = new Search(...query);

        // 3) Prepare UI for results
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            searchView.renderResults(state.search.results);
        }
        catch {
            alert('Error during request, please wait until retry');
        }

        clearLoader(elements.searchRes);

    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    let btn = e.target.closest(elemensStr.searchBtn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage);
    }
});

const controlRecipe = async e => {
    e.preventDefault();

    // Get ID form url
    const id = window.location.hash.replace('#', '');

    if (id) {
        let query = [...queryBase, id];
        
        // Create new Recipe Object
        state.recipe = new Recipe(...query);

        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.searchRecipe);

        // Highlight selected recipe
        if (state.search) searchView.highlightSelected(id);

        try {
           // Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings, time and ingredients
            state.recipe.calcTime();
            state.recipe.parseIngredients();

            // Render recipe
            recipeView.renderRecipe(state.recipe);
        }
        catch {
            alert('Error processing recipe');
        }
    
        clearLoader(elements.searchRecipe);

    }   
};

window.addEventListener('hashchange', controlRecipe);

//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlList = () => {

    // Create a new list if there is none yet
    if (!state.list) state.list = new List();


    // Add each ingredient to the list
    state.recipe.ingredients.forEach((curr, i)=> {
        state.list.addItem(curr.count, curr.unit, curr.ingredient);
        listView.renderItem(state.list.items[i]);
    })


};


// Handling recipe button clicks
elements.searchRecipe.addEventListener('click', e => {
    
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updServIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updServIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) controlList();
    
});

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) listView.deleteItem(id);
});




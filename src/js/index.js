import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements, elemensStr, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
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
        searchView.clearRecipe();
        renderLoader(elements.searchRecipe);

        try {
           // Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings(); 
            state.recipe.parseIngredients();

            // Render recipe

            
        }
        catch {
            alert('Error processing recipe');
        }
    
        clearLoader(elements.searchRecipe);

    }   
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));




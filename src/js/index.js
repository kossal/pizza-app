import Search from './models/Search';
import {elements, elemensStr, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import {urlAPI, keyAPI, proxyCORS} from './api_settings';

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
        const query = [urlAPI, keyAPI, proxyCORS, queryStr];

        // 2) New search object and add to state
        state.search = new Search(...query);
        console.log(state.search.call);

        // 3) Prepare UI for results
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        searchView.renderResults(state.search.results);
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




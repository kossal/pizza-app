import Search from './models/Search';
import {elements} from './views/base';
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
    console.log(queryStr);

    if(queryStr) {
        const query = [urlAPI, keyAPI, proxyCORS, queryStr];

        // 2) New search object and add to state
        state.search = new Search(...query);
        console.log(state.search);

        // 3) Prepare UI for results


        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        console.log(state.search.results);

    }

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


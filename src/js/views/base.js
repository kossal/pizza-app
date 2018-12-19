export const elemensStr = {
    searchForm: '.search',
    searchInput: '.search__field',
    searchResList: '.results__list',
    searchRes: '.results',
    loader: '.loader',
    searchResPages: '.results__pages',
    searchBtn: '.btn-inline',
    searchRecipe: '.recipe',
    shopping: '.shopping__list'
};

export const elements = {
    searchForm: document.querySelector(elemensStr.searchForm),
    searchInput: document.querySelector(elemensStr.searchInput),
    searchResList: document.querySelector(elemensStr.searchResList),
    searchRes: document.querySelector(elemensStr.searchRes),
    searchResPages: document.querySelector(elemensStr.searchResPages),
    searchRecipe: document.querySelector(elemensStr.searchRecipe),
    shopping: document.querySelector(elemensStr.shopping)
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elemensStr.loader.slice(1)}">
            <svg>
                <use href="img/icons.svg#icon-cw">
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);

};

export const clearLoader = () => {
    const loader = document.querySelector(elemensStr.loader);

    if (loader) loader.parentNode.removeChild(loader);

};

export const custRegEx = {
    isFirstSpace: /^\s+/, //Detects one or multiple spaces at the beginning of a string
    isLastSpace: /\s+$/, //Detects one or multiple spaces at the end of a string
    isFandLSpace: /^\s+|\s+$/g, //Detects one or multiple spaces at the beginning and end of a string
    isMiddleSpace: /\b\s{2,}\b/g, //Detects two or more spaces in between words
    isNotStr: /[^\w|\s]|\d/g, //Detects simbols and numbers
    isNotStroDsh: /[^\w|\s|-]|\d/g, //Detects simbols and numbers except dashes "-""
    isDash: /-/g,
    repSpace: /\b\s\b/g //Detects single space between words
};

export const formatDefault = function(str) {
    const r = custRegEx;
    
    //Erases numbers and simbols exluding a dashes "-"
    str = str.replace(r.isNotStroDsh, '');
    
    //Erases spaces in the beginning and end
    str = str.replace(r.isFandLSpace, '');
    
    //Replaces spaces in between words with a singular space
    str = str.replace(r.isMiddleSpace, ' ');
    
    //Replaces dashes "-" with URL Encoding
    str = str.replace(r.isDash, '%2D');
    
    //Replaces spaces with URL Encoding
    str = str.replace(r.repSpace, '%20');
    
    return str;
}

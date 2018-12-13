import {elements} from './base';

export const formatDefault = function(str) {
    const isFirstSpace = /^\s+/; //Detects one or multiple spaces at the beginning of a string
    const isLastSpace = /\s+$/; //Detects one or multiple spaces at the end of a string
    const isMiddleSpace = /\b\s{2,}\b/g; //Detects two or more spaces in between words
    const isNotStr = /[^\w|\s]|\d/; //Detects simbols and numbers
    const repSpace = /\b\s\b/g; //Detects single space between words

    if (str) {

        //Check if there is spaces at the beginning and removes them
        let i = str.match(isFirstSpace);

        if(i) {
            str = str.slice(i[0].length);
        }

        //Check if there is spaces at the end and removes them
        i = str.match(isLastSpace);
        if(i) {
            str = str.slice(0, str.length - i[0].length);
        }

        str = str.replace(isMiddleSpace, ' ');

        //Returns false if the input have digits, too many spaces or simbols
        if (!isNotStr.test(str)) {
            return str.replace(repSpace, '%20');//Return %20 instead of spaces between words
        } else {
            console.error('Not valid input. It contains simbols and numbers');
            return false;
        }

    }

}

export const getInput = () => {
    
    let data = elements.searchInput.value;

    data = formatDefault(data);

    if (data) {
        return data;
    } else {
        return false;
    }

};


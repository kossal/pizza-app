import axios from 'axios';

export default class Search {
    constructor(url, key, proxy, query) {
        this.url = url;
        this.key = key;
        this.proxy = proxy;
        this.query = query;
        this.call = `${this.proxy}${this.url}?key=${this.key}&q=${this.query}`;
        this.results;
    }
    async getResults() {
        try {
            const res = await axios(this.call);
            this.results = res.data.recipes;
        }
        catch(err) {
            alert(err);
        }
    }
}


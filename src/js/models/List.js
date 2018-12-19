import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
    }

    deleteItem (id) {
        const index = this.items.findIndex(curr => curr.id === id);

        this.items.splice(index, 1);
    }

    updateCount (id, newCount) {
        this.items.find(curr => curr.id === id).count = newCount;
    }

}
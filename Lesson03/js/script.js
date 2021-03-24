const sample_items = [
    { name: 'Shirt', price: 150 },
    { name: 'Socks', price: 50 },
    { name: 'Jacket', price: 350 },
    { name: 'Shoes', price: 250 },
];

class ShopItem {
    constructor (name, price) {
        this.name = name;
        this.price = price;
    }

    render() {
        return `<div class="shop-item"><h3>${this.name}</h3><p>${this.price}</p></div>\n`;
    }
}


class ShopItemsList {
    constructor() {
        this.items = [];
    }

    const fetchShopItems = (sample_items) => {
        return new Promise((resolve, reject) => {
            if (sample_items.length > 0) {
                sample_items.forEach(item => this.add(item))
                resolve('OK');
            } else {
                reject('Error');
            }
        });
    }

    getItemsTotalPrice() {
        let total = 0;
        this.items.forEach(item => total += item.price);
        return Number(total).toFixed(2);
    }

    add(item) {
        this.items.push(item);
    }

    render(selector) {
        let listHTML = '';
        this.items.forEach(i => {
            const item = new ShopItem(i.name, i.price);
            listHTML += item.render();
        });
        document.querySelector(selector).innerHTML = listHTML;
    }
}


class BasketItem extends ShopItem {
    constructor(name, price) {
        super(name, price);
        this.count = 1;
    }

    render() {
        return `<div class="basket-item"><h3>${this.name}</h3><p>${this.count} pcs.</p><p>${this.price}</p><p>Total: ${Number(this.count * this.price).toFixed(2)}</p></div>\n`;
    }
}


class Basket {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        for (let i in this.items) {
            if (this.items[i].title === item.title)
                this.items[i].count ++;
            else
                this.items.push(item);
        }
    }

    delItem(item) {
        for (let i in this.items) {
            if (this.items[i].title === item.title) {
                this.items[i].count --;
                if (this.items[i].count === 0)
                    this.items.splice(i, 1);
            }
            break;
        }
    }

    clearItem(item) {
        for (let i in this.items) {
            if (this.items[i].title === item.title)
                this.items.splice(i, 1);
            break;
        }
    }

    clear() {
        this.items = [];
    }

    count() {
        let count = 0;
        this.items.forEach(item => count += item.count);
        return count;
    }

    total() {
        let sum = 0;
        if (this.items.length > 0)
            this.items.forEach(item => sum += item.price * item.count);
        return Number(sum.toFixed(2));
    }

    render() {
        itemsHTML = '';
        this.items.forEach(item => itemsHTML += item.render());
        document.querySelector('.basket-items-list').innerHTML = listHtml;
        document.querySelector('.basket-items-total').innerHTML = `<h4>Total: ${this.total()}</h4>\n`;
    }
}

window.onload = () => {
    const goods = new ShopItemsList();
    goods.fetchShopItems().then(() => {goods.render('.items-list')}, (error) => {alert(error)});
}

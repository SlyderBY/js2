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

    fetchShopItems() {
        this.items = [
            { name: 'Shirt', price: 150 },
            { name: 'Socks', price: 50 },
            { name: 'Jacket', price: 350 },
            { name: 'Shoes', price: 250 },
        ];
    }

    getItemsTotalPrice() {
        let total = 0;
        this.items.forEach(item => total += item.price);
        return Number(total).toFixed(2);
    }

    render() {
        let listHTML = '';
        this.items.forEach(i => {
            const item = new ShopItem(i.name, i.price);
            listHTML += item.render();
        });
        document.querySelector('.items-list').innerHTML = listHTML;
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


const goods = new ShopItemsList();
goods.fetchShopItems();
goods.render();

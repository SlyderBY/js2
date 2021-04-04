const sample_items = [
    { name: 'Shirt', image: 'images/shirt.webp', price: 4500 },
    { name: 'Socks', image: 'images/socks.webp', price: 1500 },
    { name: 'Jacket', image: 'images/jacket.webp', price: 13500 },
    { name: 'Shoes', image: 'images/shoes.webp', price: 8500 },
];

class ShopItem {
    constructor(name, image, price) {
        this.name = name;
        this.image = image;
        this.price = price;
    }

    render() {
        console.log("ShopItem.render(" + JSON.stringify(this) + ")");
        return `<div class="card mb-4 box-shadow">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">${this.name}</h4>
                    </div>
                    <div class="card-body">
                        <img src="${this.image}" width="150" alt="${this.name}">
                        <h1 class="card-title pricing-card-title">${this.price} &#8381</h1>
                        <button class="add-to-basket btn btn-lg btn-block btn-primary" type="button" onclick='basket.add(${JSON.stringify(this)})'>
                            В корзину
                        </button>
                    </div>
                </div>`;
    }
}

class BasketItem extends ShopItem {
    constructor(name, image, price, count = 1) {
        super(name, image, price);
        this.count = count;
    }

    //    get count() {
    //        return this.count;
    //    }

    //    set count(num) {
    //        this.count = num;
    //    }

    render() {
        return `<li class="list-group-item">
                    <h4 class="list-group-item-heading">${this.name}</h4>
                    <p class="list-group-item-text">Цена: ${this.price}</p>
                    <p class="list-group-item-text">Кол-во: ${this.count}</p>
                    <span class="badge">Стоимость: ${Number(this.count * this.price).toFixed(2)} &#8381</span>
                </li>`;
    }
}

class Basket {
    constructor() {
        this.items = [];
        let old = JSON.parse(localStorage.getItem("basket"));
        if (old !== null)
            this.items = old.items;
    }

    save() {
        console.log('Basket.save() => ' + JSON.stringify(this));
        localStorage.setItem("basket", JSON.stringify(this));
    }

    add(item) {
        let added = false;
        for (let i in this.items) {
            if (this.items[i].name === item.name) {
                this.items[i].count++;
                added = true;
                break;
            }
        }
        if (!added) {
            const newItem = new BasketItem(item.name, item.image, item.price);
            this.items.push(newItem);
        }
        this.save();
    }

    delete(item) {
        for (let i in this.items) {
            if (this.items[i].name === item.name) {
                this.items[i].count--;
                if (this.items[i].count === 0)
                    this.items.splice(i, 1);
            }
            break;
        }
    }

    clearItem(item) {
        for (let i in this.items) {
            if (this.items[i].name === item.name)
                this.items.splice(i, 1);
            break;
        }
    }

    reset() {
        this.items = [];
    }

    count() {
        return this.items.length;
    }

    total() {
        let sum = 0;
        if (this.items.length > 0)
            this.items.forEach(item => sum += item.price * item.count);
        return Number(sum.toFixed(2));
    }

    render(selector) {
        console.log('Basket.render(' + selector + ')');
        let itemsHTML = '<ul class="list-group">';
        if (this.items.length > 0) {
            this.items.forEach(i => {
                const item = new BasketItem(i.name, i.image, i.price, i.count);
                itemsHTML += item.render();
            });
            itemsHTML += `</ul>
            <h5>Итого: ${this.total()} &#8381</h5>`;
        } else {
            itemsHTML = '<h2>Ваша корзина пуста</h2>';
        }

        document.querySelector(selector).innerHTML = itemsHTML;
    }
}

class ShopItemsList {
    constructor() {
        this.items = [];
    };

    fetchShopItems() {
        return new Promise((resolve, reject) => {
            if (sample_items.length > 0) {
                sample_items.forEach(item => this.add(item));
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

    addToBasket(item) {
        let basket = JSON.parse(localStorage.getItem("basket"));
        console.log(JSON.stringify(basket));
        basket.push(item);
        localStorage.setItem("basket", JSON.stringify(basket));
    }

    render(selector) {
        let listHTML = '';
        if (this.items.length > 0) {
            this.items.forEach(i => {
                const item = new ShopItem(i.name, i.image, i.price);
                listHTML += item.render();
            });
        } else {
            listHTML = '<h1>Нет данных</h1>';
        }

        document.querySelector(selector).innerHTML = listHTML;
    }
}


//const goods = new ShopItemsList();
//const basket = new Basket();

window.onload = () => {
    //const close_basket = document.querySelector('.basket-content-close');
    //const modal_basket = document.querySelector('.basket-modal');
    //const btn_basket = document.querySelector(".btn-basket");
    const app = new Vue({
        el: '#app',
        data: {
            searchLine: '',
            isVisibleCart: false,
            goods: new ShopItemsList(),
            basket: new Basket(),
        },

        methods: {
            filterItems() {
                console.log('filterItems(): ' + this.searchLine);
            },
            openBasket() {
                this.isVisibleCart = true;
                console.log('openBasket()');
            },
            closeBasket() {
                this.isVisibleCart = false;
                console.log('closeBasket()');
            }
        },

        mounted() {
            this.goods.fetchShopItems().then(
                () => { this.goods.render('.card-deck') },
                (error) => { alert(error) }
            );
        }
    });

    //goods.fetchShopItems().then(
    //    () => { goods.render('.card-deck') },
    //    (error) => { alert(error) }
    //);

    //btn_basket.onclick = () => {
    //    modal_basket.style.display = "block";
    //    basket.render('.basket-content');
    //    app.isVisibleCart = true;
    //}

    //close_basket.onclick = () => {
    //    modal_basket.style.display = "none";
    //    app.isVisibleCart = false;
    //}

    //window.onclick = (event) => {
    //    if (event.target == modal_basket) {
    //        // modal_basket.style.display = "none";
    //        app.isVisibleCart = false;
    //    }
    //}
}
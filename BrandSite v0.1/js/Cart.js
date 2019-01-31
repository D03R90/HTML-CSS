class Cart {
    constructor(source, container = '#cart'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров
        this.cartItems = []; // Массив с товарами
        this._init(this.source);
    }
    _render(){
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalGoods = $('<div/>', {
            class: 'cart-summary sum-amount'
        });
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        $(this.container);
        $cartItemsDiv.appendTo($(this.container));
        $totalGoods.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
    }
    //Маленькая корзина
    _renderItem(product){
        let $container = $('<div/>', {
            class: 'dropFlexCart',
            'data-product': product.id_product
        });
        let $wraperDiv = $('<div/>', {
            class: 'itemInCart'
        });
        let $priceContainer = $('<p>', {
            class: 'priceContainer'
        });

        $container.append($(`<img class="product-mini-img" src="${product.src}" alt="${product.alt}">`));
        $wraperDiv.append($(`<h3 class="cart-drop__heading">${product.product_name}</h3>`));
        $wraperDiv.append($(`<i class="fas fa-star star"></i>`));
        $wraperDiv.append($(`<i class="fas fa-star star"></i>`));
        $wraperDiv.append($(`<i class="fas fa-star star"></i>`));
        $wraperDiv.append($(`<i class="fas fa-star star"></i>`));
        $wraperDiv.append($(`<i class="fas fa-star-half-alt star"></i>`));
        $priceContainer.append($(`<p class="product-quantity"> ${product.quantity} </p>`));
        $priceContainer.append($(`<p>&ensp;x&ensp;</p>`));
        $priceContainer.append($(`<p class="product-price"> ${product.price} $</p>`));
        $wraperDiv.append($priceContainer);
        $container.append($wraperDiv);

        let $delBtn = $(`<a class="delBtn"><i class="fas fa-times-circle shut"></i></a>`);
        $container.append($delBtn);
        $delBtn.click(() => {
            this._remove(product.id_product)
        });

        $container.appendTo($('.cart-items-wrap'));

        //Большая корзина

        let $containerBig = $('<tr/>', {
        });
        let $wraperTdBig = $('<td/>', {
        });
        let $prodContainerBig = $('<a/>', {
            class: 'prod-info',
            href:'http://localhost:63342/BrandSite/single_page.html'
        });
        let $wraperaDivBig = $('<div/>', {
            class: ''
        });

        $containerBig.append($wraperTdBig);
        $prodContainerBig.append($(`<img class="product-miniature-img" src="${product.src}" alt="${product.alt}">`));
        $wraperaDivBig.append($(`<h4>${product.product_name}</h4>`));
        $wraperaDivBig.append($(`<p><span>Color: </span>Red</p>`));
        $wraperaDivBig.append($(`<p><span>Size: </span>Xll</p>`));
        $prodContainerBig.append($wraperaDivBig);
        $containerBig.append($(`<td>$150</td>`));
        $containerBig.append($(`<td class="product-quantity"> ${product.quantity} </td>`));//Подумай о рамки
        $containerBig.append($(`<td>FREE</td>`));
        $containerBig.append($(`<td> ${product.price} $</td>`));

        $wraperTdBig.append($prodContainerBig);
        //TODO метод поломан для большой корзины
        let $delBtnBig = $(`<td class="delBtnBig"><i class="fas fa-times-circle shut"></i></td>`);
        $containerBig.append($delBtnBig);
        $delBtnBig.click(() => {
            this._remove(product.id_product)
        });

        $containerBig.appendTo($('.products-table'));

    }
    _renderSum(){
        //TODO реализовать отображение колличества токара над корзиной
        //$('.sum-amount').text(`${this.countGoods}`);
        $('.sum-price').text(`TOTAL $ ${this.amount}.00`);
    }
    _init(source){
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum();
            })
    }
    static _updateCart(product){
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} $`);
    }
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find){
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            Cart._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.countGoods += product.quantity;
            this.amount += product.price;
            this._renderItem(product);
        }
        this._renderSum();
    }
    _remove(idProduct){
        let find = this.cartItems.find(product => product.id_product === idProduct);
        if (find.quantity > 1){
            find.quantity--;
            Cart._updateCart(find)
        } else {
            let $container = $(`div[data-product="${idProduct}"]`);
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            $container.remove();
        }
        this.countGoods--;
        this.amount -= find.price;
        this._renderSum()
    }
}
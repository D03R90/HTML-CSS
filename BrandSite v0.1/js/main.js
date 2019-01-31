$(document).ready(() => {
    //Товары
    // let product1 = new Product(1, 'BLAZE LEGGINGS', 52);
    // let product2 = new Product(2, 'ALEXA SWEATER', 52);
    // let product3 = new Product(3, 'Mango People T-shirt', 25);

    //Корзина
    let mycart = new Cart('getCart.json');

    //Добавление товара
    $('#products').on('click', '.buyBtn', e => {
        mycart.addProduct(e.target);
    });

    //Отзывы
    let myfeed = new Feedback('feedback.json');
});
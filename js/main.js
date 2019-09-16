$(document).ready(() => {
    //Корзина
    let cart = new Cart('getCart.json');

    //Добавление товара
    $('.products__product-add').click(e => {
        cart.addProduct(e.target);
    });
});
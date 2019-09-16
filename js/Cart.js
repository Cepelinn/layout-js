class Cart {
    constructor(source, container = '#dropdown-cart') {
        this.source = source;
        this.container = container;
        this.countGoods = 0;
        this.amount = 0;
        this.cartItems = [];
        this.isCartPage = $("tbody").is("#shopping-cart-body");
        this._init();
    }

    _render() {
        let $dropdownCartItems = $('<div/>', {
            class: 'dropdown-cart__items'
        });
        let $dropdownCartPrice = $('<div/>', {
            class: "dropdown-menu__products-price-wrap"
        });
        let $total = $('<p/>', {
            class: 'dropdown-menu__products-price-text',
            text: 'Total'
        });
        let $totalPrice = $('<p/>', {
            class: 'dropdown-menu__products-price',
            text: '0'
        });
        $dropdownCartItems.appendTo($(this.container));
        $total.appendTo($dropdownCartPrice);
        $totalPrice.appendTo($dropdownCartPrice);
        $dropdownCartPrice.appendTo($(this.container));
        if (this.isCartPage) {
            this._renderTableButtons();

        }
    }

    _init() {
        this._render();
        if (!localStorage.getItem('mycart')) {
            fetch(this.source)
                .then(result => result.json())
                .then(data => {
                    for (let product of data.contents) {
                        this.cartItems.push(product);
                        this._renderItem(product);
                    }
                    this.countGoods = data.countGoods;
                    this.amount = data.amount;
                    localStorage.setItem('mycart', JSON.stringify(this.cartItems));
                    localStorage.setItem('amount', JSON.stringify(this.amount));
                    localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
                    this._renderSum();
                })
        } else {
            this.cartItems = JSON.parse(localStorage.getItem('mycart'));
            for (let product of this.cartItems) {
                this._renderItem(product);
            }
            this.amount = JSON.parse(localStorage.getItem('amount'));
            this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
            this._renderSum();
        }
    }

    _renderSum() {
        let $priceBlock = $('.dropdown-menu__products-price');
        let $priceText = $('.dropdown-menu__products-price-text');
        if (this.countGoods === 0) {
            $priceText.text('Корзина пуста');
            $priceBlock.hide();
            $('.checkout').hide();
            $('.go-to-cart').hide();
            if (this.isCartPage) {
                let $cartTable = $('.shopping-cart__table');
                $cartTable.hide();
                let $shoppingButtons = $('.shopping-cart__buttons');
                $shoppingButtons.hide();
                let $grandPrice = $('.shopping-info__checkout-grand-price');
                $grandPrice.hide();
                let $subPrice = $('.shopping-info__checkout-sub-price');
                $subPrice.hide();
                let $grandtext = $('.shopping-info__checkout-grand-text');
                $grandtext.text('Корзина пуста');
                let $subText = $('.shopping-info__checkout-sub-text');
                $subText.hide();
            }
            localStorage.clear();
        } else {
            if ($priceBlock.is(':hidden')) {
                $priceText.text('Total');
                $priceBlock.show();
                $('.checkout').show();
                $('.go-to-cart').show();
                $priceBlock.html(`${this.amount}&nbsp;&#36;`);
                if (this.isCartPage) {
                    let $cartTable = $('.shopping-cart__table');
                    $cartTable.show();
                    let $shoppingButtons = $('.shopping-cart__buttons');
                    $shoppingButtons.show();
                    let $grandPrice = $('.shopping-info__checkout-grand-price');
                    $grandPrice.html(`${this.amount}&nbsp;&#36;`);
                    let $subPrice = $('.shopping-info__checkout-sub-price');
                    $subPrice.html(`${this.amount}&nbsp;&#36;`);
                    let $grandtext = $('.shopping-info__checkout-grand-text');
                    $grandtext.show();
                    let $subText = $('.shopping-info__checkout-sub-text');
                    $subText.show();
                }
            }
        }
    }

    _renderTableItem(product) {
        let $container = $('<tr/>', {
            'data-product': product.id_product
        });
        let $firstCell = $('<td/>', {
            class: "shopping-cart__table-body-first-cell"
        });
        let $tableItem = $('<div/>', {
            class: 'shopping-cart__table-item'
        });
        let $productImg = $('<img/>', {
            src: product.img,
            alt: 'mango people t-shirt',
            class: 'shopping-cart__image'
        });
        let $productImgHref = $('<a/>', {
            href: 'single-page.html',
            class: 'shopping-cart__image-href'
        });
        let $infoWrap = $('<div/>');
        let $nameHeader = $('<h3/>');
        let $nameHref = $('<a/>', {
            href: 'single-page.html',
            text: product.product_name
        });
        let $color = $('<p/>', {
            html: `&nbsp;${product.color}`
        });
        let $size = $('<p/>', {
            html: `&nbsp;${product.size}`
        });
        let $tableBodyCellPrice = $('<td/>', {
            class: 'shopping-cart__table-body-cell',
            html: `&#36;${product.price}`
        });
        let $tableBodyQuantity = $('<td/>', {
            class: 'shopping-cart__table-body-cell'
        });
        let $quantityInput = $('<p/>', {
            class: 'shopping-cart__table-body-input',
            // type: 'text',
            text: product.quantity
        });
        let $shipping = $('<td/>', {
            class: 'shopping-cart__table-body-cell',
            text: `FREE`
        });
        let $subTotal = $('<td/>', {
            class: 'shopping-cart__table-body-cell',
            html: `&#36; ${product.price * product.quantity}`
        });
        let $delBtn = $('<button/>', {
            class: 'delBtn shopping-cart__delBtn',
            text: 'x',
            'data-id': product.id_product,
        }).click(e => {
            e.preventDefault();
            this._removeProduct(product.id_product);
        });
        let $delBtnWrap = $('<td/>', {
            class: 'shopping-cart__table-body-cell'
        });

        $nameHref.appendTo($nameHeader);
        $nameHeader.appendTo($infoWrap);
        $('<span>Color</span>').prependTo($color);
        $('<span>Size</span>').prependTo($size);
        $color.appendTo($infoWrap);
        $size.appendTo($infoWrap);
        $productImg.appendTo($productImgHref);
        $productImgHref.appendTo($tableItem);
        $infoWrap.appendTo($tableItem);
        $tableItem.appendTo($firstCell);
        $firstCell.appendTo($container);
        $tableBodyCellPrice.appendTo($container);
        $quantityInput.appendTo($tableBodyQuantity);
        $tableBodyQuantity.appendTo($container);
        $shipping.appendTo($container);
        $subTotal.appendTo($container);
        $delBtn.appendTo($delBtnWrap);
        $delBtnWrap.appendTo($container);
        $('#shopping-cart-body').append($container);
    }

    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'dropdown-menu__product-card',
            'data-product': product.id_product
        });
        let $productImgHref = $('<a/>', {
            href: 'single-page.html',
            class: 'dropdown-menu__product-img-wrap'
        });
        let $productImg = $('<img/>', {
            class: 'dropdown-menu__product-card-img',
            src: product.img,
            alt: "product"
        });
        let $productInfo = $('<div/>', {
            class: 'dropdown-menu__product-card-info',
        });
        let $productHref = $('<a/>', {
            class: 'dropdown-menu__product-card-name',
            href: 'single-page.html',
            text: product.product_name
        });
        let $productRating = $('<div/>', {
            class: 'dropdown-menu__product-card-rating',
        });
        let $productQuantityAndPrice =
            $(`<p class="dropdown-menu__product-card-details">
                ${product.quantity}&nbsp;x&nbsp;&#36;${product.price}
              </p>`);
        let $delBtnWrap = $('<div/>', {
            class: 'dropdown-menu__product-del-btn-wrap',
        });
        let $delBtn = $('<button/>', {
            class: 'delBtn dropdown-menu__product-del-btn',
            text: 'x',
            'data-id': product.id_product,
        }).click(e => {
            e.preventDefault();
            this._removeProduct(product.id_product);
        });
        $productImg.appendTo($productImgHref);
        $productImgHref.appendTo($container);
        $productHref.appendTo($productInfo);
        for (let i = 1; i <= 5; i++) {
            $productRating.append($(`<i class="fas fa-star"></i>`));
            //TODO: Предусмотреть разный рейтинг
        }
        $productRating.appendTo($productInfo);
        $productQuantityAndPrice.appendTo($productInfo);
        $productInfo.appendTo($container);
        $delBtn.appendTo($delBtnWrap);
        $delBtnWrap.appendTo($container);
        $container.appendTo($('.dropdown-cart__items'));
        if (this.isCartPage) {
            this._renderTableItem(product);
        }
    }

    _updateCart(product) {
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.dropdown-menu__product-card-details').html(
            `<p class="dropdown-menu__product-card-details">
                ${product.quantity}&nbsp;x&nbsp;&#36;${product.price}
              </p>`);
        if (this.isCartPage) {
            let $tableContainer = $(`tr[data-product="${product.id_product}"]`);
            $tableContainer.find('.shopping-cart__table-body-input').text(`${product.quantity}`);
        }
        this._renderSum()
    }

    addProduct(element) {
        console.log(element);
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                quantity: 1,
                img: $(element).data('img'),
                color: $(element).data('color'),
                size: $(element).data('size')
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods++;
            this._renderItem(product);
        }
        localStorage.setItem('mycart', JSON.stringify(this.cartItems));
        localStorage.setItem('amount', JSON.stringify(this.amount));
        localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
        this._renderSum();
    }

    _removeProduct(productId) {
        let itemWrap = $(`.dropdown-menu__product-card[data-product=${productId}]`);
        let productQuantity = this._getProductQuantity(productId);
        if (productQuantity === 1) {
            itemWrap.remove();
            this._removeItemFromArr(productId);
            if (this.isCartPage) {
                this._removeTableProduct(productId);
            }
        } else {
            this._decrementProduct(productId);
        }
    }

    _removeTableProduct(productId) {
        let itemWrap = $(`tr[data-product=${productId}]`);
        itemWrap.remove();
    }

    _renderTableButtons() {
        let $clearBtn = $('<button/>', {
            id: 'clearBtn',
            class: 'btn',
            text: 'CLEAR SHOPPING CART'
        }).click(e => {
            e.preventDefault();
            this._clearCart();
        });
        let $checkoutBtn = $('<a/>', {
            href: 'checkout.html',
            class: 'btn',
            text: 'CONTINUE SHOPPING'
        });
        let $container = $('.shopping-cart__buttons-content');
        $clearBtn.appendTo($container);
        $checkoutBtn.appendTo($container);
    }

    _getProductQuantity(productId) {
        let quantity = this.cartItems.find(product => product.id_product === productId);
        return quantity.quantity;
    }

    _removeItemFromArr(productId) {
        let findIndex = this.cartItems.findIndex(product => product.id_product === productId);
        let find = this.cartItems.find(product => product.id_product === productId);
        this.cartItems.splice(findIndex, 1);
        this.countGoods -= 1;
        this.amount -= find.price;
        this._updateCart(find);
        localStorage.setItem('mycart', JSON.stringify(this.cartItems));
        localStorage.setItem('amount', JSON.stringify(this.amount));
        localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
        this._renderSum();
    }

    _decrementProduct(productId) {
        for (let item in this.cartItems) {
            if (this.cartItems[item].id_product === productId) {
                this.cartItems[item].quantity -= 1;
                let find = this.cartItems.find(product => product.id_product === productId);
                this.countGoods -= 1;
                this.amount -= this.cartItems[item].price;
                localStorage.setItem('mycart', JSON.stringify(this.cartItems));
                localStorage.setItem('amount', JSON.stringify(this.amount));
                localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
                this._updateCart(find);
            }
        }
    }

    _clearCart() {
        let itemsCount = this.cartItems.length;
        for (let i = 0; i < itemsCount; i++) {
            if (this.cartItems[0].quantity > 1) {
                this.cartItems[0].quantity = 1;
            }
            this._removeProduct(this.cartItems[0].id_product);
        }
        localStorage.clear();
        this.countGoods = 0;
        this._renderSum();
    }
}
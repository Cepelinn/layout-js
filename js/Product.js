class Product {
    constructor(id, title, price,
                img = 'https://placehold.it/200x150/0097A7/FFFFFF',
                color, size,
                container = '#products__product-items'){
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.color = color;
        this.size = size;
        this.container = container;
        this._render(this.container);
    }
    _render(container){
        let $wrapperOuter = $('<div/>', {
            class: 'products__product-card'
        });
        let $wrapperInner = $('<div/>', {
            class: 'products__product-item-card'
        });
        let $aHref = $('<a/>', {
            href: 'single-page.html'
        });
        let $img = $('<img/>', {
            class: 'products__product-item-image',
            src: this.img,
            alt: 'Some img alt'
        });
        let $centerBlock = $('<div/>', {
            class: 'products__center-block'
        });
        let $addWrap = $('<div/>', {
            class: 'products__product-add-wrap'
        });
        let $addBtn = $('<button/>', {
            class: 'products__product-add',
            'data-id': this.id,
            'data-price': this.price,
            'data-name': this.title,
            'data-img': this.img,
            'data-color': this.color,
            'data-size': this.size
        });
        let $addText = $('<span/>', {
            text: 'Add to cart',
            'data-id': this.id,
            'data-price': this.price,
            'data-name': this.title,
            'data-img': this.img,
            'data-color': this.color,
            'data-size': this.size
        });
        let $cartImg = $('<img/>', {
            class: 'add-cart',
            src: 'img/cart-add.svg',
            alt: 'Add item',
            'data-id': this.id,
            'data-price': this.price,
            'data-name': this.title,
            'data-img': this.img,
            'data-color': this.color,
            'data-size': this.size
        });
        let $btnsWrap = $('<div/>', {
            class: 'products__product-buttons-wrap'
        });
        let $addAnother = $('<a/>', {
            class: 'products__add-another',

        });
        let $addFavourite = $('<a/>', {
            class: 'products__add-to-favourite',

        });
        let $name = $('<div/>', {
            class: 'products__product-item-name',
            text: this.title
        });
        let $price = $(`<div class="products__product-item-price pink">&#36;${this.price}</div>`);


        $img.appendTo($aHref);
        $cartImg.appendTo($addBtn);
        $addText.appendTo($addBtn);
        $('<i class="fas fa-retweet"></i>').appendTo($addAnother);
        $addAnother.appendTo($btnsWrap);
        $('<i class="far fa-heart">').appendTo($addFavourite);
        $addFavourite.appendTo($btnsWrap);
        $addBtn.appendTo($addWrap);
        $btnsWrap.appendTo($addWrap);
        $addWrap.appendTo($centerBlock);
        $aHref.appendTo($wrapperInner);
        $centerBlock.appendTo($wrapperInner);
        $name.appendTo($wrapperInner);
        $price.appendTo($wrapperInner);
        $wrapperInner.appendTo($wrapperOuter);
        $(container).append($wrapperOuter);
    }

}
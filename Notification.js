class Notification {
    constructor(source, container = '.notifications__wrap') {
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров в корзине
        this.items = []; //Массив для хранения товаров
    }

    init(source) {
        fetch(source)
            .then(result => result.json())
            .then(data => {
                this.items.push(data.event);
                this._renderItem(data.event);

                if (this.items.length === 0) {
                    $('.notifications__empty').show()
                } else {
                    $('.notifications__empty').hide()
                }
            });
    }

    _renderItem(item) {
        let $logo = '';
        let $class = '';
        let time = item.eventTime;

        if (item.priority === '2') {
            $class = ' notification-item___alert';
        } else if (item.priority === '1') {
            $class = ' notification-item___yellow';
        } else if (item.priority === '0') {
            $class = '';
        };

        if (item.eventStatus === 'alarm') {
            $logo = '<i class="fas fa-fire"></i>';
        } else if (item.eventStatus === 'ok') {
            $logo = '<i class="fas fa-check"></i>';
        } else if (item.eventStatus === 'info') {
            $logo = '<i class="fas fa-exclamation-triangle"></i>';
        };

        let $h = item.eventSystemType;
        let $content = item.description;
        let result = '<div class="notification-item' + $class + '"><div class="notification-item__logo">' + $logo + '</div><div class="notification-item__text"><div class="notification-item__h">' +
            $h + '</div><div class="notification-item__content">' + $content + '</div></div><div class="notification-item__time">' + time + '</div></div>';
        $(this.container).append($(result));
    }

    _renderSum() {
        $('.sum-price').text(`$${this.amount.toFixed(1)}`);
        if (this.amount == '0') {
            $(this.container).find('.cart__empty').fadeIn('fast');
        } else {
            $(this.container).find('.cart__empty').fadeOut('fast');
        }
        let $qtyLabel = $(this.container).next();
        $qtyLabel.text(this.countGoods);
        $qtyLabel.removeClass('wobble');
        setTimeout(() => {
            $qtyLabel.addClass('wobble');
        }, 10);
        if (this.countGoods < 1) {
            $qtyLabel.fadeOut('fast');
        } else {
            $qtyLabel.fadeIn('medium');
        }
    }
    _updateCart(product) {
        let $container = $(`div[data-product=${product.id_product}]`);
        $container.find('.cart__qty-name').text(`${product.quantity} x $${product.price}`);
    }
    addProduct(element) {
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
                product_name: $(element).data('name'),
                price: +$(element).data('price'),
                quantity: 1,
                img: $(element).data('img')
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItem(product, true);
        }
        this._renderSum();
    }

    remove(productToDelete) {
        //Todo: удаление товара
        let productId = +productToDelete.dataset.id;
        let theProduct = this.cartItems.find(product => product.id_product === productId);

        theProduct.quantity--;
        this.amount -= theProduct.price;
        this.countGoods--;

        if (theProduct.quantity > 0) {
            this._updateCart(theProduct);
        } else {
            this._deleteItem(productId);
            var indexToRemove = this.cartItems.findIndex(product => product.id_product === productId);
            this.cartItems.splice(indexToRemove, 1);
        }
        this._renderSum();
    }
    _deleteItem(containerId) {
        let $container = $(`div[data-product=${containerId}]`);
        $container.next().remove();
        $container.slideUp('200');
        setTimeout(() => {
            $container.remove()
        }, 2400); //удаляю сам элемент по таймеру, когда анимация заканчивается

    }
}
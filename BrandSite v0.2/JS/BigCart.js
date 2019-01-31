class BigCart {
    constructor(source = './JS/cart.json', containerClass = '.cart-drop-down', formClass = '.form_choose') {
      this.formClass = formClass;
      this.source = source;
      this.container = containerClass;
      this.totalQuantaty = 0; // РћР±С‰РµРµ РєРѕР»-РІРѕ С‚РѕРІР°СЂРѕРІ РІ РєРѕСЂР·РёРЅРµ
      this.totalAmount = 0; // РћР±С‰Р°СЏ СЃС‚РѕРёРјРѕСЃС‚СЊ С‚РѕРІР°СЂРѕРІ
      this.cartGoods = []; // РњР°СЃСЃРёРІ СЃ С‚РѕРІР°СЂР°РјРё
      this._init(this.source);
      this._addProductHandler();
      this._renderRedQuantatyCircle()
  
    }
  
  
    _renderProduct(product) {
      let $cartItemContainer = $('<div/>', {
        class: 'cart-drop-down__product-container'
      });
  
      let $cartItemHref = $('<a/>', {
        href: "./single_page.html",
        'data-product-id': product.id,
        'data-product-color': product.color,
        'data-product-size': product.size,
        class: 'product-container__a-item',
      });
  
      let $cartItemImg = $('<img/>', {
        src: product.imageSrc,
        alt: product.imageAlt,
        class: 'a-item__img'
      });
      let $cartItemTextContainer = $('<div/>', {
        class: 'a-text-container'
      });
  
      let $cartItemName = $(`<p class="a-item-text">${product.productName}</p>`);
  
      let $cartItemStarsWrapper = $('<p/>', {
        class: 'a-item-star'
      })
  
      let $cartItemPrice = $(`<p class="a-item-price">${product.quantaty} x $${product.price}</p>`);
  
  
      for (let i = 1; i <= 5; i++) {
        if (i <= product.rating) {
          let $fullStar = $(`<i class="fas fa-star"></i>`);
          $fullStar.appendTo($cartItemStarsWrapper);
        } else {
          let $emptyStar = $(`<i class="far fa-star"></i>`);
          $emptyStar.appendTo($cartItemStarsWrapper);
        }
  
      }
  
      let $cartItemButton = $('<button class="product-container__button"><i class="fas fa-times-circle"></i></button>');
      $($cartItemButton).click(() => {
        this._removeItem($cartItemButton.prev());
      })
  
  
      $cartItemName.appendTo($cartItemTextContainer);
      $cartItemStarsWrapper.appendTo($cartItemTextContainer);
      $cartItemPrice.appendTo($cartItemTextContainer);
  
      $cartItemImg.appendTo($cartItemHref);
      $cartItemTextContainer.appendTo($cartItemHref);
      $cartItemHref.appendTo($cartItemContainer);
      $cartItemButton.appendTo($cartItemContainer);
      $(this.container).prepend($cartItemContainer);
  
    }
  
  
    _bigCartRender(product) {
      let $bigCartElem = $('<tr\>', {
        class: 'flex_item_table',
        'data-product-id': product.id,
        'data-product-color': product.color,
        'data-product-size': product.size,
        html: `<th class="flex_cell  item_table_details">
        <dl>
          <dt class="item_img">
            <!-- clearfix -->
            <a href="./single_page.html">
              <img src=${product.imageSrc} alt=${product.imageAlt}>
            </a>
          </dt>
  
          <dd class="item_link">
            <a href="./single_page.html">${product.productName}</a>
          </dd>
        </dl>
        <dl class="flex_dl dl_second_item">
          <dt class="item_terms2">
            Color:
          </dt>
          <dd class="item_definition2">
            ${product.color.toUpperCase()}
          </dd>
        </dl>
  
        <dl class="flex_dl dl_third_item clearfix">
          <dt class="item_terms3">
            Size:
          </dt>
          <dd class="item_definition3">
            ${product.size}
          </dd>
        </dl>
  
      </th>
      <th class="flex_cell cell_flex_container item_table_price">
        <span>$${+product.price}</span>
      </th>
      <th class="flex_cell cell_flex_container item_table_quantity">
        <input type="number" class="input_table_item_quantaty"  
         value="${product.quantaty}">
      </th>
      <th class="flex_cell cell_flex_container item_table_shipping">
        <span>FREE</span>
      </th>
      <th class="flex_cell cell_flex_container item_table_subtotal">$${+product.price*+product.quantaty}</th>
      <th class="flex_cell cell_flex_container item_table_action">
        <button class="button-remove-item-big_cart">
          <i class="fas fa-times-circle"></i>
        </button>
      </th>`
      });
  
  
      let $tableItemContainer = $('tbody');
      $bigCartElem.prependTo($tableItemContainer);
  
  
      $bigCartElem.on('click', '.button-remove-item-big_cart', (event) => {
        this._removeItem($bigCartElem);
      })
  
  
      $bigCartElem.on('input', '.input_table_item_quantaty', (event) => {
        if (+$(event.target).val() < 0) {
          $(event.target).val('0');
          return;
        }
        this._renderBigCartOnChange($bigCartElem, product, event);
      });
  
      $bigCartElem.find('.input_table_item_quantaty').focusout((event) => {
        if (($bigCartElem.find('.input_table_item_quantaty').val() === "0") ||
          (+$bigCartElem.find('.input_table_item_quantaty').val() <= 0)) {
          $bigCartElem.find('.input_table_item_quantaty').val('1');
          this._renderBigCartOnChange($bigCartElem, product, event);
        }
      })
  
      this._clearCart();
  
  
    }
  
    _renderBigCartOnChange($bigCartElem, product, event) {
      let newProductQuantaty = +$(event.target).val();
      if (newProductQuantaty !== product.quantaty) {
        this.totalQuantaty += +newProductQuantaty - product.quantaty;
        this.totalAmount += (+newProductQuantaty - product.quantaty) * product.price;
        product.quantaty = newProductQuantaty;
        let $elemOfCart = $(`a.product-container__a-item[data-product-id='${product.id}'][data-product-size='${product.size}'][data-product-color='${product.color}']`)
        this._updateBigCart(product, $bigCartElem);
        this._updateCart(product, $elemOfCart);
        this._renderSum();
        this._renderBigCartSum()
      }
    }
  
  
  
    _renderRedQuantatyCircle() {
      $('.a_cart_red_circle>.red_circle_span').text(this.totalQuantaty);
    }
  
    _init(source) {
  
      if (!localStorage.getItem('myCart')) {
        fetch(source)
          .then(result => result.json())
          .then(data => {
            for (let product of data.goods) {
              this.cartGoods.push(product);
              this._renderProduct(product);
              this._bigCartRender(product); /*РґР»СЏ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ Р±РѕР»СЊС€РѕР№ С‚Р°Р±Р»РёС†Рµ РЅР° shopping_catr.html*/
            }
  
            this.totalQuantaty = data.totalQuantaty;
            this.totalAmount = data.totalAmount;
            localStorage.setItem('myCart', JSON.stringify(this.cartGoods));
            localStorage.setItem('totalQuantaty', this.totalQuantaty);
            localStorage.setItem('totalAmount', this.totalAmount);
  
            this._renderSum();
            this._renderBigCartSum();
  
          });
      } else {
        this.cartGoods = JSON.parse(localStorage.getItem('myCart'));
        for (let product of this.cartGoods) {
          this._renderProduct(product);
          this._bigCartRender(product);
        }
        this.totalQuantaty = +localStorage.getItem('totalQuantaty');
        this.totalAmount = +localStorage.getItem('totalAmount');
        this._renderSum();
        this._renderBigCartSum();
      }
  
  
      /* this._render(); */
    }
  
    _renderSum() {
      $('.summary-container__span:last').text(`$${this.totalAmount}`);
      this._renderRedQuantatyCircle();
  
    }
  
    _renderBigCartSum() {
      $('#sub_total').text(`$${this.totalAmount}`);
      $('#grand_total').text(`$${this.totalAmount}`);
    }
  
  
  
    _removeItem($element) {
      let productIdNumber = $element.data("productId");
      let productSize = $element.data("productSize");
      let productColor = $element.data("productColor");
  
      let $elementHref = $(`a.product-container__a-item[data-product-id='${productIdNumber}'][data-product-size='${productSize}'][data-product-color='${productColor}']`);
  
      let $elementTr = $(`tr[data-product-id='${productIdNumber}'][data-product-size='${productSize}'][data-product-color='${productColor}']`);
  
      /*  let findProduct = this.cartGoods.find(product => product.id === +productIdNumber); */
      let findProduct = this.cartGoods.find(find => (find.id === +productIdNumber && find.color === productColor && find.size === productSize));
      if (findProduct.quantaty < 2) {
        $($elementHref).closest('.cart-drop-down__product-container').remove();
        $($elementTr).remove();
        this.totalAmount = this.totalAmount - findProduct.price;
        this.totalQuantaty--;
        this.cartGoods.splice(this.cartGoods.indexOf(findProduct), 1);
        this._renderSum();
        this._renderBigCartSum();
        localStorage.setItem('myCart', JSON.stringify(this.cartGoods));
        localStorage.setItem('totalQuantaty', this.totalQuantaty);
        localStorage.setItem('totalAmount', this.totalAmount);
        return;
      }
  
      this.totalAmount = this.totalAmount - findProduct.price;
      findProduct.quantaty--;
      this.totalQuantaty--;
      this._updateCart(findProduct, $elementHref)
      this._updateBigCart(findProduct, $elementTr)
  
  
  
      this._renderSum();
      this._renderBigCartSum();
      localStorage.setItem('myCart', JSON.stringify(this.cartGoods));
      localStorage.setItem('totalQuantaty', this.totalQuantaty);
      localStorage.setItem('totalAmount', this.totalAmount);
  
  
    }
  
    _updateCart(product, $element) {
      let $priceElement = $($element).find('.a-item-price');
      $priceElement.text(`${product.quantaty} x $${product.price}`)
    }
  
    _updateBigCart(product, $element) {
      let $itemSubtotalElement = $($element).find('.item_table_subtotal');
      let $quantatyElement = $($element).find('.input_table_item_quantaty');
      $itemSubtotalElement.text(`$${product.price*product.quantaty}`);
      $quantatyElement.val(product.quantaty);
    }
  
    _addProductHandler() {
      $(this.formClass).submit(event => {
        event.preventDefault();
        this.addProductToCart();
      })
    }
  
    addProductToCart(addProduct = '') {
      let newProduct = {};
      if (addProduct === '') {
        let $newProductPrice = $(this.formClass).prev('.price_number').children().text();
        let $newProductColor = $('#color').val();
        let $newProductSize = $('#size').val();
        let $newProductQuantaty = $('#quantity').val();
        let $newProductId = $(this.formClass + '>.button_submit_img').data('id');
        let $newProductImageSrc = $(this.formClass + '>.button_submit_img').data('imageSrc');
        let $newProductImageAlt = $(this.formClass + '>.button_submit_img').data('imageAlt');
        let $newProductName = $(this.formClass + '>.button_submit_img').data('productName');
        let $newProductRating = $(this.formClass + '>.button_submit_img').data('rating');
  
        newProduct = {
          "id": +$newProductId,
          "imageSrc": $newProductImageSrc,
          "imageAlt": $newProductImageAlt,
          "productName": $newProductName,
          "price": $newProductPrice,
          "quantaty": +$newProductQuantaty,
          "color": $newProductColor,
          "size": $newProductSize.toUpperCase(),
          "rating": $newProductRating
        }
      } else {
        newProduct = {
          "id": +addProduct.id,
          "imageSrc": addProduct.imageSrc,
          "imageAlt": addProduct.imageAlt,
          "productName": addProduct.productName,
          "price": addProduct.price,
          "quantaty": addProduct.quantaty,
          "color": addProduct.color,
          "size": addProduct.size.toUpperCase(),
          "rating": addProduct.rating
        }
      };
      let findProduct = this.cartGoods.find(find => (find.id === newProduct.id && find.color === newProduct.color && find.size === newProduct.size));
      if (findProduct) {
        /*  if (findProduct.color === $newProductColor && findProduct.size === $newProductSize.toUpperCase()) { */
        findProduct.quantaty += +newProduct.quantaty;
        this.totalQuantaty += +newProduct.quantaty;
        this.totalAmount += +newProduct.quantaty * +newProduct.price;
        let $cartFoundElem = $(this.container + `>div>a[data-product-id="${findProduct.id}"][data-product-color="${findProduct.color}"][data-product-size="${findProduct.size}"]`);
        this._updateCart(findProduct, $cartFoundElem);
        this._renderSum();
        this._addToLocalStorage();
        return;
      } else {
        this.cartGoods.push(newProduct);
        this.totalQuantaty += +newProduct.quantaty;
        this.totalAmount += +newProduct.quantaty * +newProduct.price;
        this._renderProduct(newProduct);
        this._renderSum();
        this._addToLocalStorage();
  
      }
  
  
  
    }
  
    _addToLocalStorage() {
      localStorage.setItem('myCart', JSON.stringify(this.cartGoods));
      localStorage.setItem('totalQuantaty', this.totalQuantaty);
      localStorage.setItem('totalAmount', this.totalAmount);
    }
  
  
    _clearCart() {
      $('button[type="reset"]').on('click', () => {
        this.totalAmount = 0;
        this.totalQuantaty = 0;
        this.cartGoods.forEach(element => {
          element.quantaty = 1;
          this.totalQuantaty += +element.quantaty;
          this.totalAmount += +element.price;
        });
  
        let $arrayTr = $('tbody>tr');
        for (let i = 0; i < $arrayTr.length; i++) {
          this._removeItem($($arrayTr[i]));
        }
  
      });
    }
  
  
  
  
  
  }
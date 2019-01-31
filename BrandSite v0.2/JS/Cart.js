class Cart {
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
  
  
    /*     <div class="cart-drop-down__product-container">
                  <a href="./single_page.html" class="product-container__a-item">
                    <img src="./img/Goods1_cart.jpg" alt="image of item" class="a-item__img">
                    <div class="a-text-container">
                      <p class="a-item-text">Rebox Zane</p>
                      <p class="a-item-star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                          class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></p>
                      <p class="a-item-price">1 x $250</p>
                    </div>
                  </a>
  
                  <button class="product-container__button"><i class="fas fa-times-circle"></i></button>
                </div> */
  
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
        this._removeItem($cartItemButton);
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
  
    /*     <tr class="flex_item_table">
        <th class="flex_cell  item_table_details">
          <dl>
            <dt class="item_img">
              <!-- clearfix -->
              <a href="#">
                <img src="./img/item1_shiping_cart_p.jpg" alt="product_img">
              </a>
            </dt>
  
            <dd class="item_link">
              <a href="#">Mango People T-shirt</a>
            </dd>
          </dl>
          <dl class="flex_dl dl_second_item">
            <dt class="item_terms2">
              Color:
            </dt>
            <dd class="item_definition2">
              Red
            </dd>
          </dl>
  
          <dl class="flex_dl dl_third_item clearfix">
            <dt class="item_terms3">
              Size:
            </dt>
            <dd class="item_definition3">
              Xll
            </dd>
          </dl>
  
  
        </th>
        <th class="flex_cell cell_flex_container item_table_price">
          <span>$150</span>
        </th>
        <th class="flex_cell cell_flex_container item_table_quantity">
          <input type="number" value="1">
        </th>
        <th class="flex_cell cell_flex_container item_table_shipping">
          <span>FREE</span>
        </th>
        <th class="flex_cell cell_flex_container item_table_subtotal">$300</th>
        <th class="flex_cell cell_flex_container item_table_action">
          <button>
            <i class="fas fa-times-circle"></i>
          </button>
        </th>
      </tr> */
  
    _bigCartRender(product) {
      let $bigCartElem = $('<tr\>', {
        class: 'flex_item_table',
        'data-product-id': product.id,
        html: `<th class="flex_cell  item_table_details">
        <dl>
          <dt class="item_img">
            <!-- clearfix -->
            <a href="#">
              <img src=${product.imageSrc} alt=${product.imageAlt}>
            </a>
          </dt>
  
          <dd class="item_link">
            <a href="#">${product.productName}</a>
          </dd>
        </dl>
        <dl class="flex_dl dl_second_item">
          <dt class="item_terms2">
            Color:
          </dt>
          <dd class="item_definition2">
            ${product.color}
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
        <input type="number" value="${product.quantaty}">
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
  
    }
  
  
  
    _renderRedQuantatyCircle() {
      $('.a_cart_red_circle>.red_circle_span').text(this.totalQuantaty);
    }
  
    _init(source) {
  
      fetch(source)
        .then(result => result.json())
        .then(data => {
          for (let product of data.goods) {
            this.cartGoods.push(product);
            this._renderProduct(product);
            /*   this._bigCartRender(product); /*РґР»СЏ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ Р±РѕР»СЊС€РѕР№ С‚Р°Р±Р»РёС†С‹ РЅР° shopping_cart.html*/
          }
  
          console.log(this.cartGoods);
          this.totalQuantaty = data.totalQuantaty;
          this.totalAmount = data.totalAmount;
          this._renderSum();
  
        })
      /* this._render(); */
    }
  
    _renderSum() {
      $('.summary-container__span:last').text(`$${this.totalAmount}`);
      this._renderRedQuantatyCircle();
  
    }
  
    _removeItem(element) {
      let $elementHref = $(element).prev();
      let productIdNumber = $elementHref.data("productId");
      let productSize = $elementHref.data("productSize");
      let productColor = $elementHref.data("productColor");
  
      /*  let findProduct = this.cartGoods.find(product => product.id === +productIdNumber); */
      let findProduct = this.cartGoods.find(find => (find.id === +productIdNumber && find.color === productColor && find.size === productSize));
      if (findProduct.quantaty < 2) {
        $(element).closest('.cart-drop-down__product-container').remove();
        this.totalAmount = this.totalAmount - findProduct.price;
        this.totalQuantaty--;
        this.cartGoods.splice(this.cartGoods.indexOf(findProduct), 1);
        this._renderSum();
        return;
      }
  
      this.totalAmount = this.totalAmount - findProduct.price;
      findProduct.quantaty--;
      this.totalQuantaty--;
      this._updateCart(findProduct, $elementHref)
  
  
  
      this._renderSum();
  
    }
  
    _updateCart(product, $element) {
      let $priceElement = $($element).find('.a-item-price');
      $priceElement.text(`${product.quantaty} x $${product.price}`)
    }
  
    _addProductHandler() {
      $(this.formClass).submit(event => {
        event.preventDefault();
        this._addProductToCart();
      })
    }
  
    _addProductToCart() {
      let newProduct = {};
      let $newProductPrice = $(this.formClass).prev('.price_number').children().text();
      let $newProductColor = $('#color').val();
      let $newProductSize = $('#size').val();
      let $newProductQuantity = $('#quantity').val();
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
        "quantaty": +$newProductQuantity,
        "color": $newProductColor,
        "size": $newProductSize.toUpperCase(),
        "rating": $newProductRating
      };
      let findProduct = this.cartGoods.find(find => (find.id === newProduct.id && find.color === newProduct.color && find.size === newProduct.size));
      if (findProduct) {
        /*  if (findProduct.color === $newProductColor && findProduct.size === $newProductSize.toUpperCase()) { */
        findProduct.quantaty += +$newProductQuantity;
        this.totalQuantaty += +$newProductQuantity;
        this.totalAmount += +$newProductQuantity * +$newProductPrice;
        let $cartFoundElem = $(this.container + `>div>a[data-product-id="${findProduct.id}"][data-product-color="${findProduct.color}"][data-product-size="${findProduct.size}"]`);
        this._updateCart(findProduct, $cartFoundElem);
        this._renderSum();
        return;
      } else {
        this.cartGoods.push(newProduct);
        this.totalQuantaty += +$newProductQuantity;
        this.totalAmount += +$newProductQuantity * +$newProductPrice;
        this._renderProduct(newProduct);
        this._renderSum();
      }
  
  
  
    }
  
  
  }
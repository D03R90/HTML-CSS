class Product {
    constructor(source = './JS/products.json', settings = {
      "numberOfElements": 4,
      "photosId": [135, 136]
    }, bigCartItem, containerClass = '.featured_items') {
      this.settings = settings;
      this.source = source;
      this.container = containerClass;
      this.bigCartItem = bigCartItem;
      this.products = []; // РњР°СЃСЃРёРІ СЃ С‚РѕРІР°СЂР°РјРё
      this._init(this.source, this.settings.numberOfElements);
      this.getProducts();
  
  
    }
  
  
    _init(source, numberOfElements) {
      fetch(source)
        .then(result => result.json())
        .then(data => {
          for (let product of data.goods) {
            this.products.push(product);
            /* this._renderProduct(product); */
            if (this.settings.photosId.length === 0) {
              if (numberOfElements > 0) {
                this._renderProduct(product);
                numberOfElements--;
              }
            } else {
              if (this.settings.photosId.includes(product.id)) {
                this._renderProduct(product);
              }
            }
          }
          localStorage.setItem('products', JSON.stringify(this.products));
        })
  
  
  
      /* if (!localStorage.getItem('products')) {
        fetch(source)
          .then(result => result.json())
          .then(data => {
            for (let product of data.goods) {
              this.products.push(product);
                  if (this.settings.photosId.length === 0) {
                if (numberOfElements > 0) {
                  this._renderProduct(product);
                  numberOfElements--;
                }
              } else {
                if (this.settings.photosId.includes(product.id)) {
                  this._renderProduct(product);
                }
              }
            }
            localStorage.setItem('products', JSON.stringify(this.products));
          })
      } else {
        this.products = JSON.parse(localStorage.getItem('products'));
        if (this.settings.photosId.length === 0) {
          for (let i = 0; i < numberOfElements; i++) {
            this._renderProduct(this.products[i]);
          }
        } else {
          this.products.find((product) => {
            return settings.photosId.includes(product.id)
          })
  
          this._renderProduct(product);
        }
      } */
  
  
    }
  
  
  
  
  
  
  
    /* <div class="featured_item">
              <a class="product" href="./single_page.html">
                <img src="./img/single_product1.jpg" alt="item" class="img_f_item">
  
  
                <p class="item_first_line">Mango People T-shirt</p>
                <p class="item_second_line t-red">$52.00</p>
  
              </a>
  
              <div class="add_cart_flex">
                <a href="#Add_to_Cart" class="a_add_cart" data-product-price="52.00" data-product-color="black"
                  data-product-size="XL" data-product-quantaty="1" data-product-name="Mango People T-shirt" data-id="156"
                  data-rating="4" data-product-image-src="./img/single_product1.jpg" data-product-image-alt="image of product in cart">
                  <img src="./img/white_cart.svg" alt="cart" class="img_add_cart">Add to Cart</a>
              </div>
  
            </div> */
  
  
    _renderProduct(product) {
      let $newProductElem = $('<div\>', {
        class: 'featured_item',
        html: `<a class="product" href="./single_page.html">
      <img src=${product.imageSrc} alt=${product.imageAlt} class="img_f_item">
      <p class="item_first_line">${product.productName}</p>
      <p class="item_second_line t-red">$${product.price}</p>
  
    </a>
  
    <div class="add_cart_flex">
      <a href="#Add_to_Cart" class="a_add_cart" data-product-price=${product.price} data-product-color=${product.color}
        data-product-size=${product.size} data-product-quantaty=${product.quantaty} data-product-name=${product.productName} data-id=${product.id}
        data-rating=${product.rating} data-product-image-src=${product.imageSrc} data-product-image-alt=${product.imageAlt} data-sex=${product.sex}>
        <img src="./img/white_cart.svg" alt="cart" class="img_add_cart">Add to Cart</a>
    </div>`
      });
      $($newProductElem).on('click', '.a_add_cart', () => {
        this.bigCartItem.addProductToCart(product);
        //this.getProducts(product)
      })
      $(this.container).append($newProductElem);
    }
  
    getProducts(product) {
      return product;
    }
  }
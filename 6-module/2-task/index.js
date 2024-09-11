import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  constructor(product) {
    this.product = product;
    this.elem = this.render();
  }

  template(product) {
    return `
      <div class="card" data-nuts="${product.nuts}" data-vegeterian="${product.vegeterian}" data-spiciness="${product.spiciness}" data-category="${product.category}">
          <div class="card__top">
              <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
              <span class="card__price">€${product.price.toFixed(2)}</span>
          </div>
          <div class="card__body">
              <div class="card__title">${product.name}</div>
              <button type="button" class="card__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
          </div>
      </div>
    `
  }

  render() {
    this.elem = createElement(this.template(this.product));
    this.productAdd();
    return this.elem;
  }

  productAdd() {
    const cardBtn = this.elem.querySelector('.card__button');
    const event = new CustomEvent('product-add', {
      detail: this.product.id,
      bubbles: true
    });

    cardBtn.addEventListener('click', function() {
      cardBtn.dispatchEvent(event);
    });
  }
}

document.body.addEventListener('product-add', (event) => {
  console.log('Товар добавлен в корзину', event.detail);
});

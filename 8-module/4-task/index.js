import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      const cartItem = this.cartItems.find(item => item.product.id === product.id);
      if (cartItem) {
        cartItem.count += 1;
      } else {
        this.cartItems.push({
          product: product,
          count: 1
        });
      }

      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);
    cartItem.count += amount;

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.getTotalCount() === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum += item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum += item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2) * count}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderSuccessMessage() {
    return createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`);
  }

  renderModal() {
    let orderBody = document.createElement('div');
    let orderForm = this.renderOrderForm();

    this.cartItems.forEach(item => {
      orderBody.append(this.renderProduct(item.product, item.count));
    });

    orderBody.append(orderForm);

    this.modal.setTitle('Your order');
    this.modal.setBody(orderBody);
    this.modal.open();

    orderBody.addEventListener('click', (event) => this.changeCount(event));
    orderForm.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');
      let product = modalBody.querySelector(`[data-product-id="${productId}"]`);
      let productCount = product.querySelector(`.cart-counter__count`);
      let productPrice = product.querySelector(`.cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count) {
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      } else {
        product.remove();
      }

      if (this.isEmpty()) {
        this.modal.close();
      }
    }
    this.cartIcon.update(this);
  }

  changeCount(event) {
    const buttonPlus = event.target.closest('.cart-counter__button_plus');
    const buttonMinus = event.target.closest('.cart-counter__button_minus');
    const productId = event.target.closest('.cart-product').dataset.productId;
    if (buttonPlus) {
      this.updateProductCount(productId, 1);
    }
    if (buttonMinus && productId) {
      this.updateProductCount(productId, -1);
    }
  };

  onSubmit(event) {
    event.preventDefault();
    const form = document.querySelector('.cart-form');
    const submitBtn = document.querySelector('.modal__body [type="submit"]');

    submitBtn.classList.add('is-loading');

    const response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    });

    response
      .then((resp) => {
        this.cartItems = [];
        this.modal.setTitle('Success!');
        this.modal.setBody(this.renderSuccessMessage());
      });

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


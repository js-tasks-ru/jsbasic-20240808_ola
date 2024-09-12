import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const container = document.querySelector('.container');
    const documentWidth = document.documentElement.clientWidth;
    const elemWidth = this.elem.offsetWidth;
    const elemoffsetTop = this.elem.getBoundingClientRect().top;
    const elemOffsetLeft = 20;
    const elemOffsetRight = 10;
    const documentMinWidth = 767;

    if (elemWidth && window.scrollY > elemoffsetTop  && documentWidth > documentMinWidth) {
      let left = Math.min(
                      container.offsetWidth + container.getBoundingClientRect().left + elemOffsetLeft,
                      documentWidth - elemWidth - elemOffsetRight);

      this.elem.style.cssText = `
        position: fixed;
        z-index: 1000;
        top: 50px;
        left: ${left}px;
      `;
    } else {
      this.elem.style.cssText = '';
    }
  }
}

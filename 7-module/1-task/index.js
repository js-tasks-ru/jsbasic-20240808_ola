import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.#initRibbonMenu();
    this.#ribbonSelect();
  }

  #template() {
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${this.categories.map(item => `
            <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
        `).join('')}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `
  }

  #render() {
    this.elem = createElement(this.#template());
    return this.elem;
  }

  #initRibbonMenu() {
    this.ribbonArrowRight.classList.add('ribbon__arrow_visible');

    this.ribbonArrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.ribbonArrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      this.#arrowsShow();
    });
  }

  #arrowsShow() {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    scrollLeft == 0 ? this.ribbonArrowLeft.classList.remove('ribbon__arrow_visible') : this.ribbonArrowLeft.classList.add('ribbon__arrow_visible');
    scrollRight < 1 ? this.ribbonArrowRight.classList.remove('ribbon__arrow_visible') : this.ribbonArrowRight.classList.add('ribbon__arrow_visible');
  }

  #ribbonSelect() {
    this.elem.addEventListener('click', (e) => {
      if (e.target.closest('.ribbon__item')) {
        const ribbonBtn = e.target.closest('.ribbon__item');
        const id = ribbonBtn.dataset.id;

        ribbonBtn.dispatchEvent(
          new CustomEvent('ribbon-select', {
            detail: id,
            bubbles: true
          })
        );
      }
    });
  }
}

document.body.addEventListener('ribbon-select', (event) => {
  console.log('Выбрана категория', event.detail);
});



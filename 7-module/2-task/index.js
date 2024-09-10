import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.#render();
    this.title = this.elem.querySelector('.modal__title');
    this.body = this.elem.querySelector('.modal__body');
    this.#closeEvents();
  }

  #template() {
    return `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
    `
  }

  #render() {
    this.elem = createElement(this.#template());
    return this.elem;
  }

  setTitle(title) {
    this.title.textContent = title;
  }

  setBody(node) {
    this.body.innerHTML = '';
    this.body.append(node);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
  }

  #closeEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest(".modal__close")) {
        this.close();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.code == "Escape") {
        e.preventDefault();
        this.close();
      }
    });
  }
}

import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.currentValue = value;
    this.elem = this.#render();
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.valueShow = this.elem.querySelector('.slider__value');
    this.stepsItems = this.elem.querySelectorAll('.slider__steps span');
    this.stepsSections = this.steps - 1;
    //this.#setValue(0);
    this.#eventListeners();
  }

  #template() {
    return `
    <div class="slider">
      <div class="slider__thumb" style="left: 0;">
        <span class="slider__value"></span>
      </div>
      <div class="slider__progress" style="width: 0;"></div>
      <div class="slider__steps">${'<span></span>'.repeat(this.steps)}</div>
    </div>
    `
  }

  #render() {
    this.elem = createElement(this.#template());

    return this.elem;
  }

  #eventListeners() {
    this.elem.addEventListener('click', this.#onClick);

    this.thumb.ondragstart = (e) => e.preventDefault();
    this.thumb.addEventListener('pointerdown', this.#onDown);
  }

  #onDown = () => {
    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp, { once: true });

    this.elem.classList.add('slider_dragging');
  }


  #onUp = ({pageX}) => {
    document.removeEventListener('pointermove', this.#onMove);

    this.elem.classList.remove('slider_dragging');

    this.#setValue(pageX);

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.currentValue,
        bubbles: true
      })
    );
  }

  #onClick = ({pageX}) => {
    this.#setValue(pageX);

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.currentValue,
        bubbles: true
      })
    );
  }

  #onMove = ({pageX}) => {
    this.#setValue(pageX, true);
  }

  #setValue(pageX, isFloat = false) {

    let leftPosition = (pageX - this.elem.offsetLeft) / this.elem.offsetWidth;
    let valueFloat = leftPosition * this.stepsSections;
    let value = Math.round(valueFloat);
    let leftPercents = (100 / this.stepsSections) * (isFloat ? valueFloat : value);
    if (leftPercents > 100) {
      value = this.stepsSections;
      leftPercents = 100;
    }
    if (leftPercents < 0) {
      value = 0;
      leftPercents = 0;
    }
    this.currentValue = value;

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
    this.valueShow.textContent = value;
    this.stepsItems.forEach(span => {
      span.classList.remove('slider__step-active');
    });
    this.stepsItems[value].classList.add('slider__step-active');
  }


}


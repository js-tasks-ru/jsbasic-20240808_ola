import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#render();
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.valueShow = this.elem.querySelector('.slider__value');
    this.stepsItems = this.elem.querySelectorAll('.slider__steps span');
    this.stepsSections = this.steps - 1;
    this.#setValue(this.value);
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

    this.elem.addEventListener('click', this.#changeSlider);

    return this.elem;
  }

  #changeSlider = ({pageX}) => {
    let leftPosition = (pageX - this.elem.offsetLeft) / this.elem.offsetWidth;
    let currentStep = Math.round(leftPosition * this.stepsSections);

    this.#setValue(currentStep);

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: currentStep,
        bubbles: true
      })
    );
  }

  #setValue(value) {
    let leftPercents = (100 / this.stepsSections) * value;
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
    this.valueShow.textContent = value;
    this.stepsItems.forEach(span => {
      span.classList.remove('slider__step-active');
    });
    this.stepsItems[value].classList.add('slider__step-active');
  }

}


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

    let startLeftPosition = this.value / this.stepsSections;
    this.#setValue(startLeftPosition);
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

  #onClick = ({pageX}) => {
    let leftPosition = this.#getLeftPosition(pageX);  // стоит ли выносить подобные куски кода в отдельный метод (чтобы не повторять код)?
    this.#setValue(leftPosition);

    this.#addCustomEvent();  // стоит ли выносить подобные куски кода в отдельный метод (чтобы не повторять код)?
  }

  #onDown = () => {
    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp, { once: true });

    this.elem.classList.add('slider_dragging');
  }

  #onMove = ({pageX}) => {
    let leftPosition = this.#getLeftPosition(pageX);
    this.#setValue(leftPosition, true);
  }

  #onUp = ({pageX}) => {
    document.removeEventListener('pointermove', this.#onMove);

    this.elem.classList.remove('slider_dragging');

    let leftPosition = this.#getLeftPosition(pageX);
    this.#setValue(leftPosition);

    this.#addCustomEvent();
  }

  #setValue(leftPosition, isFloat = false) {
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

  #getLeftPosition(pageX) {
    return (pageX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
    /*
    вообще тут хотелось бы не писать этот отдельный метод, и не высчитывать это перед каждым вызовом #setValue, а просто перенести это в саму функцию #setValue, я изначально так сделала (в файле index_bck.js), но в таком случае выдает ошибку на строке 14, из-за того, что this.elem.offsetWidth не высчитывается. Т.е. это работает только после каких-то событий (как в методах #onClick, #onMove, #onUp), а в контрукторе как-будто элемент еще не построен, хотя this.elem = this.#render() идет до вызова this.#setValue(). есть какое-то решение, или мы не можем никак получать размеры/положение this.elem в контрукторе?
    */
  }

  #addCustomEvent() {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.currentValue,
        bubbles: true
      })
    );
  }
}


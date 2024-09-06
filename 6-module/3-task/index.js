import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
    this.carouselSlidee = this.elem.querySelector('.carousel__inner');
    this.carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.slidesLength = this.elem.querySelectorAll('.carousel__slide').length;
    this.currentSlide = 0;
    this.initCarousel();
    this.productAdd();
  }

  template() {
    return `
        <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
          </div>
          <div class="carousel__inner">
            ${this.slides.map(slide => `
              <div class="carousel__slide" data-id="${slide.id}">
                <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                <div class="carousel__caption">
                  <span class="carousel__price">€${slide.price}</span>
                  <div class="carousel__title">${slide.name}</div>
                  <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
    `
  }

  render() {
    this.elem = createElement(this.template());
    return this.elem;
  }

  initCarousel() {
    this.carouselArrowLeft.style.display = 'none';

    this.carouselArrowRight.addEventListener('click', () => {
      this.carouselTransform(++this.currentSlide);
    });

    this.carouselArrowLeft.addEventListener('click', () => {
      this.carouselTransform(--this.currentSlide);
    });
  }

  arrowsShow(currentSlide) {
    this.carouselArrowRight.style.display = (currentSlide == (this.slidesLength - 1)) ? 'none' : '';
    this.carouselArrowLeft.style.display = (currentSlide == 0) ? 'none' : '';
  }

  carouselTransform(currentSlide) {
    this.carouselSlidee.style.transform = 'translateX(-' + currentSlide * this.carouselSlidee.offsetWidth + 'px)';
    this.arrowsShow(currentSlide);
  }

  productAdd() {
    this.elem.addEventListener('click', (e) => {
      if (e.target.closest('.carousel__button')) {
        const cardBtn = e.target.closest('.carousel__button');
        const id = e.target.closest('.carousel__slide').dataset.id;
        const event = new CustomEvent('product-add', {
          detail: id,
          bubbles: true
        });
        cardBtn.dispatchEvent(event);
      }
    });
  }
}

document.body.addEventListener('product-add', (event) => {
  console.log('Товар добавлен в корзину', event.detail);
});


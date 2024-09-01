function initCarousel() {
  const carouselSlidee = document.querySelector('.carousel__inner');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const slidesLength = document.querySelectorAll('.carousel__slide').length;
  const containerWidth = carouselSlidee.offsetWidth;
  let currentSlide = 0;

  carouselArrowLeft.style.display = 'none';

  const arrowsShow = (currentSlide) => {
    carouselArrowRight.style.display = (currentSlide == (slidesLength - 1)) ? 'none' : '';
    carouselArrowLeft.style.display = (currentSlide == 0) ? 'none' : '';
  }
  const carouselTransform = (currentSlide) => {
    carouselSlidee.style.transform = 'translateX(-' + currentSlide * containerWidth + 'px)';
    arrowsShow(currentSlide);
  }

  carouselArrowRight.addEventListener('click', () => {
    carouselTransform(++currentSlide);
  });

  carouselArrowLeft.addEventListener('click', () => {
    carouselTransform(--currentSlide);
  });
}

import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() { // мы в конструкторе ничего не пишем? или тут нужно создавать все экземпляры this.carousel, this.ribbonMenu, this.stepSlider и т.д. есть ли какая-то разница?
  }

  async render() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.nutsCheckbox = document.getElementById('nuts-checkbox');
    this.vegeterianCheckbox = document.getElementById('vegeterian-checkbox');


    const response = await fetch('products.json', {
      method: 'GET'
    });

    this.products = await response.json();

    this.productsGrid = new ProductsGrid(this.products);
    let productsGridHolder = document.body.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: this.nutsCheckbox.checked,
      vegeterianOnly: this.vegeterianCheckbox.checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.#renderLayout();
    this.#addEventListeners();

  }

  #renderLayout() {
    const carouselHolder = document.body.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);

    const ribbonHolder = document.body.querySelector('[data-ribbon-holder]');
    ribbonHolder.append(this.ribbonMenu.elem);

    const stepSliderHolder = document.body.querySelector('[data-slider-holder]');
    stepSliderHolder.append(this.stepSlider.elem);

    const cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);
  }

  #addEventListeners() {
    document.body.addEventListener('product-add', (e) => {
      let productToAdd = this.products.find((product) => product.id === e.detail);
      if (productToAdd) {
        this.cart.addProduct(productToAdd);
      }
    });

    this.stepSlider.elem.addEventListener('slider-change', (e) => {
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({
        category: e.detail
      });
    });

    this.nutsCheckbox.addEventListener('change', (e) => {
      this.productsGrid.updateFilter({
        noNuts: this.nutsCheckbox.checked
      });
    });

    this.vegeterianCheckbox.addEventListener('change', (e) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: this.vegeterianCheckbox.checked
      });
    });
  }
}

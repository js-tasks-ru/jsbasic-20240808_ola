import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#render();
    this.inner = this.elem.querySelector('.products-grid__inner');
    this.renderProducts();
  }

  #template() {
    return `
    <div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>
    `
  }

  #render() {
    this.elem = createElement(this.#template());

    return this.elem;
  }

  renderProducts() {
    this.inner.innerHTML = '';
    this.products
      .filter(product => { // насколько хорошее решение использовать тут фильтры? есть более правильное решение?
        return this.filters.noNuts ? product.nuts !== this.filters.noNuts : true;
      })
      .filter(product => {
        return this.filters.vegeterianOnly ? product.vegeterian === this.filters.vegeterianOnly : true;
      })
      .filter(product => {
        return this.filters.maxSpiciness ? product.spiciness <= this.filters.maxSpiciness : true;
      })
      .filter(product => {
        return this.filters.category ? product.category === this.filters.category : true;
      })
      .forEach(product => {
        let card = new ProductCard(product);
        this.inner.append(card.elem);
      });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderProducts();
  }
}

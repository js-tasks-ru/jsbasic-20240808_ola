export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.cartItems = [];
  }

  addProduct(product) {
    if (product) {
      const cartItem = this.cartItems.find(item => item.product.id === product.id);
      if (cartItem) {
        cartItem.count += 1;
      } else {
        this.cartItems.push({
          product: product,
          count: 1
        });
      }

      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);
    cartItem.count += amount;

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.getTotalCount() === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum += item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum += item.product.price * item.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}


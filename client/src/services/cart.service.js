class CartService {
    getCart() {
        const cart = localStorage.getItem("cart");

        return cart ? JSON.parse(cart) : [];
    }

    addToCart(item) {
        const cart = this.getCart();
        const existingItem = cart.find(
            (cartItem) => cartItem.name === item.name
        );
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    removeFromCart(itemName) {
        let cart = this.getCart();
        cart = cart.filter((cartItem) => cartItem.name !== itemName);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    clearCart() {
        localStorage.removeItem("cart");
    }
}

export default new CartService();

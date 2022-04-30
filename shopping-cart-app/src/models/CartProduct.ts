import Product from "./Product";

export default interface CartProduct extends Product {
    quantity: number;
}

export function countTotalProducts(products: CartProduct[]) {
    return products.reduce((count, product) => count + product.quantity, 0);
}

export function calculateTotalPrice(products: CartProduct[]) {
    return products.reduce((total, product) =>
        total + product.quantity * product.price, 0);
}

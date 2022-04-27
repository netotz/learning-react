import Product from "./Product";

export default interface CartProduct extends Product {
    amount: number;
}

export function countTotalProducts(products: CartProduct[]) {
    return products.reduce((count, product) => count + product.amount, 0);
}
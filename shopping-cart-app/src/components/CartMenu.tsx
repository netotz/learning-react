import CartProduct, { calculateTotalPrice } from "../models/CartProduct"
import { CartMenuStyled } from "./CartMenu.styles";
import CartMenuItem from "./CartMenuItem";

interface Props {
    cartProducts: CartProduct[];
    handleAddToCart: (p: CartProduct) => void;
    handleRemoveFromCart: (id: number) => void;
}

export default function CartMenu({ cartProducts, handleAddToCart, handleRemoveFromCart }: Props) {
    return (
        <CartMenuStyled>
            <h2>Cart</h2>
            {cartProducts.length === 0 ? <p>No items in cart.</p> : null}
            {cartProducts.map(product => (
                <CartMenuItem key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    ></CartMenuItem>
            ))}
            <h2>Total: ${calculateTotalPrice(cartProducts).toFixed(2)}</h2>
        </CartMenuStyled>
    );
}
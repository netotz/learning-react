import { Button } from "@mui/material";
import CartProduct from "../models/CartProduct";
import { Info, Item } from "./CartMenuItem.styles";

interface Props {
    product: CartProduct;
    handleAddToCart: (p: CartProduct) => void;
    handleRemoveFromCart: (id: number) => void;
}

export default function CartMenuItem({ product, handleAddToCart, handleRemoveFromCart }: Props) {
    return (
        <Item>
            <div>
                <h3>{product.title}</h3>
                <Info>
                    <p>Price: ${product.price}</p>
                    <p>Total: ${(product.quantity * product.price).toFixed(2)}</p>
                </Info>
                <Info>
                    <Button size="small" disableElevation
                        variant="contained"
                        onClick={() => handleRemoveFromCart(product.id)}>-</Button>
                    <p>{product.quantity}</p>
                    <Button size="small" disableElevation
                        variant="contained"
                        onClick={() => handleAddToCart(product)}>+</Button>
                </Info>
            </div>
            <img src={product.image} alt={product.title}></img>
        </Item>
    );
}
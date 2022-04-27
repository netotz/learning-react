import Button from '@mui/material/Button';
import { Product } from '../models/Product';

interface Props {
    product: Product;
    handleAddToCart: (p: Product) => void;
}

export default function ProductCard({ product, handleAddToCart }: Props) {
    return (
        <div>
            <img src={product.image} alt={product.title}></img>
            <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <h3>${product.price}</h3>
            </div>
            <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
        </div>
    )
}
import Button from '@mui/material/Button';
import { Product } from '../models/Product';
import { Card, CardInfo } from './ProductCard.styles';

interface Props {
    product: Product;
    handleAddToCart: (p: Product) => void;
}

export default function ProductCard({ product, handleAddToCart }: Props) {
    return (
        <Card>
            <img src={product.image} alt={product.title}></img>
            <CardInfo>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <h3>${product.price}</h3>
            </CardInfo>
            <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
        </Card>
    )
}
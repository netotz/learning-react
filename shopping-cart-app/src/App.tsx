import { AddShoppingCart } from '@mui/icons-material';
import { Badge, Drawer, Grid, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { MainDiv, StyledIconButton } from './App.styles';
import ProductCard from './components/ProductCard';
import CartProduct, { countTotalProducts } from './models/CartProduct';
import Product from './models/Product';

enum Queries {
  Products = 'products'
}

enum FakeStoreApi {
  Products = "https://fakestoreapi.com/products",
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
  
  const { data, isLoading, error } = useQuery<Product[]>(
    Queries.Products,
    async () => await (await fetch(FakeStoreApi.Products)).json()
  );

  console.log(data);

  if (isLoading) {
    return <LinearProgress></LinearProgress>
  }
  if (error) {
    return <div>Something went wrong</div>
  }

  function handleAddToCart(product: Product) {

  }

  return (
    <MainDiv>
      <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        Cart
      </Drawer>

      <StyledIconButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={countTotalProducts(cartProducts)} color="info">
          <AddShoppingCart></AddShoppingCart>
        </Badge>
      </StyledIconButton>
      
      <Grid container spacing={3}>
        {data?.map(product => (
          <Grid item key={product.id} xs={12} sm={4}>
            <ProductCard product={product}
              handleAddToCart={handleAddToCart}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </MainDiv>
  );
}

export default App;

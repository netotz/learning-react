import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useQuery } from 'react-query';
import ProductCard from './components/ProductCard';
import { Product } from './models/Product';

enum Queries {
  Products = 'products'
}

enum FakeStoreApi {
  Products = "https://fakestoreapi.com/products",
}

function App() {
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
    <div>
      <Grid container spacing={3}>
        {data?.map(product => (
          <Grid item key={product.id} xs={12} sm={4}>
            <ProductCard product={product}
              handleAddToCart={handleAddToCart}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;

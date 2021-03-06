import { AddShoppingCart } from '@mui/icons-material';
import { Badge, Drawer, Grid, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { MainDiv, StyledIconButton } from './App.styles';
import CartMenu from './components/CartMenu';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import CartProduct, { countTotalProducts } from './models/CartProduct';
import Product from './models/Product';

enum Queries {
  Products = 'products'
}

enum FakeStoreApi {
  Products = "https://fakestoreapi.com/products",
}

enum StorageKeys {
  CartProducts = 'CartProducts'
}

function loadCartProducts() {
  const jsonProducts = localStorage.getItem(StorageKeys.CartProducts) || "";
  return JSON.parse(jsonProducts) as CartProduct[];
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState(loadCartProducts());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const jsonProducts = JSON.stringify(cartProducts);
    localStorage.setItem(StorageKeys.CartProducts, jsonProducts);
  }, [cartProducts]);

  const { data, isLoading, error } = useQuery<Product[]>(
    Queries.Products,
    async () => await (await fetch(FakeStoreApi.Products)).json()
  );

  if (isLoading) {
    return <LinearProgress></LinearProgress>
  }
  if (error) {
    return <div>Something went wrong</div>
  }

  function handleAddToCart(newProduct: Product) {
    setCartProducts(products => {
      // if product is already in cart
      if (cartProducts.find(p => p.id === newProduct.id)) {
        return products.map(p => {
          if (p.id === newProduct.id) {
            // increment amount
            p.quantity++;
          }
          return p;
        });
      }

      // if it's first time of this product in cart
      return [...products, {
        ...newProduct,
        quantity: 1
      }];
    });
  }

  function handleRemoveFromCart(idToRemove: number) {
    setCartProducts(products =>
      products.filter(p => {
        if (p.id === idToRemove) {
          if (p.quantity <= 1) {
            // filter out product whose amount would be 0
            return false;
          }

          p.quantity--;
        }

        return true;
      })
    );
  }

  return (
    <MainDiv>
      <SearchBar term={searchTerm} setTerm={setSearchTerm}></SearchBar>

      <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <CartMenu cartProducts={cartProducts}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart} />
      </Drawer>

      <StyledIconButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={countTotalProducts(cartProducts)} color="info">
          <AddShoppingCart />
        </Badge>
      </StyledIconButton>

      <Grid container spacing={3}>
        {
          data?.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
            || product.description.toLowerCase().includes(searchTerm))
            .map(product => (
              <Grid item key={product.id} xs={12} sm={4}>
                <ProductCard product={product}
                  handleAddToCart={handleAddToCart} />
              </Grid>
            ))
        }
      </Grid>
    </MainDiv>
  );
}

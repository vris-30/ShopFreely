import React from "react";
import { commerce } from "./api/Commerce";
import { Navbar, Products, Cart } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState({});
  const [order, setOrder] = React.useState({});
  const [error, setError] = React.useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (product_id, quantity) => {
    const item = await commerce.cart.add(product_id, quantity);
    console.log({ item });
    setCart(item.cart);
  };

  const handleUpdateCartQuantity = async (product_id, quantity) => {
    const update = await commerce.cart.update(product_id, { quantity });

    setCart(update.cart);
  };

  const handleRemoveCartItems = async (product_id) => {
    const remove = await commerce.cart.remove(product_id);

    setCart(remove.cart);
  };

  const handleEmptyItems = async () => {
    const empty = await commerce.cart.empty();

    setCart(empty.cart);
  };

  const refresh = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCheckout = async (tokenId, newOrder) => {
    try {
      const incommingOrder = await commerce.checkout.capture(tokenId, newOrder);
      setOrder(incommingOrder);
      refresh();
    } catch (e) {
      setError(e?.data?.message);
    }
  };

  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar totalItems={cart?.total_items} />
        <Routes>
          <Route
            path="/"
            element={
              <Products products={products} handleAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQuantity={handleUpdateCartQuantity}
                handleRemoveCartItems={handleRemoveCartItems}
                handleEmptyItems={handleEmptyItems}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                error={error}
                handleCheckout={handleCheckout}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

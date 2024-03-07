import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";

import { DUMMY_PRODUCTS } from "./dummy-products.js";
import UserProgressContextProvider from "./store/user-progress-context.jsx";
import CartModal from "./components/CartModal.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Shop>
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </Shop>
       <CartModal />
       <CheckoutModal />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

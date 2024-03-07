import { useContext } from "react";

import { CartContext } from "../store/shopping-cart-context.jsx";
import { UserProgressContext } from "../store/user-progress-context.jsx";

export default function Header() {
  const { items } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext)

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity
  }, 0);

  function handleOpenCartClick() {
    userProgressCtx.showCart();
  }

  return (
    <>
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({totalCartItems})</button>
        </p>
      </header>
    </>
  );
}

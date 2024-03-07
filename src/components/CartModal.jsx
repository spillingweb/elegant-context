import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { UserProgressContext } from "../store/user-progress-context";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

export default function CartModal() {
  const { items, updateItemQuantity } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideModal();
  }

  function handleOpenCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <div id="cart">
        {items.length === 0 && <p>No items in cart!</p>}
        {items.length > 0 && (
          <ul id="cart-items">
            {items.map((item) => {
              const formattedPrice = currencyFormatter.format(item.price);

              return (
                <li key={item.id}>
                  <div>
                    <span>{item.name}</span>
                    <span> ({formattedPrice})</span>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => updateItemQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateItemQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <p id="cart-total-price">
          Cart Total: <strong>{currencyFormatter.format(cartTotal)}</strong>
        </p>
      </div>
      <p id="modal-actions">
        <Button onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleOpenCheckout}>
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}

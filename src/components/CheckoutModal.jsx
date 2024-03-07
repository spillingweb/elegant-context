import Input from "./UI/Input";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { UserProgressContext } from "../store/user-progress-context";
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { currencyFormatter } from "../util/formatting";

export default function CheckoutModal() {
  const { items, clearCart } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideModal();
  }

  function handleSubmitOrder(event) {
    event.preventDefault();

    // const fd = new FormData(event.target);
    // const customerData = Object.fromEntries(fd);

    alert(
      "Your (imaginary) order was submitted successfully! We will get back to you with more details via email within the next few minutes."
    );

    event.target.reset();
    clearCart();
    userProgressCtx.hideModal();
  }

  let actions = (
    <>
      <Button type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form id="checkout" method="dialog" onSubmit={handleSubmitOrder}>
        <h2>Checkout</h2>
        <p>Total Amount {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" id="name" type="text" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        <p id="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

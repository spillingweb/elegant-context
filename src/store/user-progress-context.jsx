import { createContext, useState } from "react";

export const UserProgressContext = createContext({
    progress: '', // 'cart', 'checkout'
    showCart: () => {},
    hideModal: () => {},
    showCheckout: () => {},
});

export default function UserProgressContextProvider({children}) {
    const [userProgress, setUserProgress] = useState();

    function showCart() {
        setUserProgress('cart');
    }

    function hideModal() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    const ctxValue = {
        progress: userProgress,
        showCart,
        hideModal,
        showCheckout,
    }

    return (
        <UserProgressContext.Provider value={ctxValue}>{children}</UserProgressContext.Provider>
    )
}
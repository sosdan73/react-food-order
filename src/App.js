import React, {useState} from "react";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const handleShowCart = () => {
        setCartIsShown(true)
    }

    const handleHideCart = () => {
        setCartIsShown(false)
    }

    return (
        <CartProvider>
            {cartIsShown && <Cart onClose={handleHideCart} />}
            <Header
                onShowCart={handleShowCart}
                onHideCart={handleHideCart}
            />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;

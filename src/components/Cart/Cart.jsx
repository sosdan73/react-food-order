import classes from './Cart.module.css'
import React, {useContext} from 'react';
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const cartContents = cartCtx.items;
    const hasItems = cartContents.length > 0

    const handleAddItem = item => {
        cartCtx.addItem({...item, amount: 1})
    }
    const handleRemoveItem = id => {
        cartCtx.removeItem(id)
    }

    const cartItems = (
        <ul>
            {hasItems && cartContents.map(item => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={handleAddItem.bind(null, item)}
                    onRemove={handleRemoveItem.bind(null, item.id)}
                />
            ))}
        </ul>
    )

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div>
                <span>Total Amount: </span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes['button--alt']}
                    onClick={props.onClose}
                >
                    Close
                </button>
                {hasItems && (
                    <button className={classes.button}>
                        Order
                    </button>
                )}
            </div>
        </Modal>
    )
}

export default Cart
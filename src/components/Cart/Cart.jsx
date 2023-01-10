import classes from './Cart.module.css'
import React, {useContext, useState} from 'react';
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout/Checkout";

const Cart = props => {
	const [isCheckout, setIsCheckout] = useState(false)
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
	const handleOrder = () => {
		setIsCheckout(true);
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
	const modalActions = (
		<div className={classes.actions}>
			<button
				className={classes['button--alt']}
				onClick={props.onClose}
			>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={handleOrder}>
					Order
				</button>
			)}
		</div>
	)

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div>
                <span>Total Amount: </span>
                <span>{totalAmount}</span>
            </div>
			{isCheckout && <Checkout onCancel={props.onClose} />}
			{!isCheckout && modalActions}
        </Modal>
    )
}

export default Cart
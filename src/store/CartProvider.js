import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const itemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[itemIndex]
        let updatedItem;
        let updatedItems;
        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[itemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'REMOVE_ITEM') {
        let updatedItems;
        const itemIndex = state.items.findIndex(item => item.id === action.id);
        const updatedTotalAmount = state.totalAmount - state.items[itemIndex].price;
        if (state.items[itemIndex].amount > 1) {
            updatedItems = [...state.items];
            updatedItems[itemIndex].amount -= 1
        } else {
            updatedItems = state.items.filter(item => item.id !== action.id)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const handleAddItemToCart = item => {
        dispatchCartAction({type: 'ADD_ITEM', item})
    }
    const handleRemoveItemFromCart = id => {
        dispatchCartAction({type: 'REMOVE_ITEM', id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: handleAddItemToCart,
        removeItem: handleRemoveItemFromCart,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
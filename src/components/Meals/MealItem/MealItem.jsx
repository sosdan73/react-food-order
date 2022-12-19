import classes from './MealItem.module.css'
import React, {useContext} from 'react';
import MealItemForm from "./Form/MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = ({data}) => {
    const cartCtx = useContext(CartContext);
    const price = `$${data.price.toFixed(2)}`;

    const handleAddToCart = amount => {
        cartCtx.addItem({
            id: data.id,
            name: data.name,
            amount: amount,
            price: data.price
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{data.name}</h3>
                <div
                    className={classes.description}
                >
                    {data.description}
                </div>
                <div
                    className={classes.price}
                >
                    {price}
                </div>
            </div>
            <div>
                <MealItemForm onAddToCart={handleAddToCart}/>
            </div>
        </li>
    )
}

export default MealItem
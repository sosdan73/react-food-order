import classes from "./Header.module.css";
import React from "react";
import mealsImage from "../../../assets/meals.png";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

const Header = props => {
     return (
         <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
             <div className={classes['main-image']}>
                 <img src={mealsImage} alt="meals"/>
             </div>
         </>
     )
}

export default Header
import classes from './Checkout.module.css'
import React, {useRef, useState} from 'react';

const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = props => {
	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		street: true,
		postal: true,
		city: true,
	})

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const handleConfirm = e => {
		e.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName)
		const enteredStreetIsValid = !isEmpty(enteredStreet)
		const enteredPostalIsValid = !isNotFiveChars(enteredPostal)
		const enteredCityIsValid = !isEmpty(enteredCity)

		setFormInputValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postal: enteredPostalIsValid,
			city: enteredCityIsValid,
		})

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalIsValid &&
			enteredCityIsValid;

		if (!formIsValid) {
			return
		}
		console.log(enteredName, enteredStreet, enteredPostal, enteredCity);
		props.onSubmit({
			name: enteredName,
			street: enteredStreet,
			postal: enteredPostal,
			city: enteredCity
		})
	}

	return (
		<form onSubmit={handleConfirm}>
			<div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
				<label htmlFor="name">Your name</label>
				<input ref={nameInputRef} type="text" id="name"/>
				{!formInputValidity.name && <p>Please input valid data</p>}
			</div>
			<div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}>
				<label htmlFor="street">Street</label>
				<input ref={streetInputRef} type="text" id="street"/>
				{!formInputValidity.street && <p>Please input valid data</p>}
			</div>
			<div className={`${classes.control} ${formInputValidity.postal ? '' : classes.invalid}`}>
				<label htmlFor="postal">Postal</label>
				<input ref={postalInputRef} type="text" id="postal"/>
				{!formInputValidity.postal && <p>Please input 5 digits</p>}
			</div>
			<div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`}>
				<label htmlFor="city">City</label>
				<input ref={cityInputRef} type="text" id="city"/>
				{!formInputValidity.city && <p>Please input valid data</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>Cancel</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	)
}

export default Checkout
import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import {useEffect, useState} from "react";

const AvailableMeals = _ => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch('https://react-food-33af2-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
			if (!response.ok) {
				throw new Error('something went wrong');
			}
			const responseData = await response.json();
			const loadedMeals = [];
			for (let key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				})
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		}
		fetchMeals().catch(error => {
			setIsLoading(false);
			setHasError(true);
		})
	}, [])

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading...</p>
			</section>
		)
	}
	if (hasError) {
		return (
			<section className={classes.mealsError}>
				<p>{hasError}</p>
			</section>
		)
	}

    const mealsList = meals.map(meal => <MealItem key={meal.id} data={meal}/>)
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;
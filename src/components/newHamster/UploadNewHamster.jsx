import { useState } from "react"
import './uploadNewHamster.css'
import { useHistory } from 'react-router-dom';

const UploadNewHamster = () => {

	const history = useHistory();
	const [name, setName] = useState('')
	const [age, setAge] = useState("");
	const [favFood, setFavfood] = useState("");
	const [loves, setLoves] = useState("");

	const [nameTouched, setNameTouched] = useState(false);
	const [ageTouched, setAgeTouched] = useState(false);
	const [favFoodTouched, setFavFoodTouched] = useState(false);
	const [lovesTouched, setLovesTouched] = useState(false);

	const [isPending, setIsPending] = useState(false)

	let isValidName = true
	let nameErrorMessage = "";

	if (name === "" || !isNaN(Number(name))) {
		isValidName = false
		nameErrorMessage = 'Needs to be a name.'
	}

	let nameClass = ''
	if (nameTouched) {
		nameClass = (isValidName ? 'valid' : 'error')
	}

	const ageRegExp = new RegExp("^0?[1-6]$");
	let isValidAge = true;
	let ageErrorMessage = "";
	let checkedAge = ageRegExp.test(age);

	if (!checkedAge) {
		isValidAge = false;
		ageErrorMessage = "Du måste välja en siffra mellan 1 och 6.";
	}
	let ageClass = "";
	if (ageTouched) {
		ageClass = isValidAge ? "valid" : "error";
	}

	let isValidFavFood = true;
	let favFoodErrorMessage = "";
	if (favFood === "" || !isNaN(Number(favFood))) {
		isValidFavFood = false;
		favFoodErrorMessage = "Vänligen välj hamsterns favoritmat.";
	}
	let favFoodClass = "";
	if (favFoodTouched) {
		favFoodClass = isValidFavFood ? "valid" : "error";
	}

	let isValidLoves = true;
	let lovesErrorMessage = "";
	if (loves === "" || !isNaN(Number(loves))) {
		isValidLoves = false;
		lovesErrorMessage = "Vänligen välj hamsterns favoritaktivitet.";
	}
	let lovesClass = "";
	if (lovesTouched) {
		lovesClass = isValidLoves ? "valid" : "error";
	}


	let isInvalidForm = !isValidName || !isValidAge || !isValidFavFood || !isValidLoves


	const handleSubmit = async (event) => {
		event.preventDefault()

		const newHamster = {
			name,
			age: Number(age),
			favFood,
			loves,
			wins: 0,
			defeats: 0,
			games: 0,
			imgName: "hamster-default-3.jpg"
		};

		setIsPending(true)

		try {
			const response = await fetch('/hamsters/', {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newHamster)
			});
			if (!response.ok) {
				if (response.status === 400) {
					console.log('400(bad request)')
					throw Error('It was a bad request. Please try again')
				}
				else if (response.status === 404) {
					console.log('404 (not found)')
					throw Error('Could not find the data for that resourse. Please try again')
				}
				else if (response.status === 500) {
					console.log('500 (internal server error)')
					throw Error('Could not fetch the data for that resourse.  Please try again')
				}
				throw Error('Oh No! Someting went wrong! The error has to do with status code:', response.status, 'Please try again')
			}
			const formData = await response.json();
			history.push(`/HamsterProfile/${formData.id}`)

		} catch (error) {
			return error.message;
		}
	}

	return (
		<div className='form-component'>
			<h2>Ladda upp en ny hamster</h2>

			<form onSubmit={handleSubmit} className="upload-form">

				<label>Hamsters Namn:</label>
				<input
					type="text"
					className={nameClass}
					placeholder="Skriv namn..."
					value={name}
					onChange={(event) => setName(event.target.value)}
					onBlur={() => setNameTouched(true)}
				/>
				{nameTouched ? <div className="message"> {nameErrorMessage} </div> : null}

				<label>Hamsters Ålder:</label>
				<input
					type="text"
					className={ageClass}
					placeholder="Skriv ålder..."
					value={age}
					onChange={(event) => setAge(event.target.value)}
					onBlur={() => setAgeTouched(true)}
				/>
				{ageTouched ? <div className="message"> {ageErrorMessage} </div> : null}

				<label>Hamsters Favorit Mat:</label>
				<input
					type="text"
					className={favFoodClass}
					placeholder="Skriv en maträtt..."
					value={favFood}
					onChange={(event) => setFavfood(event.target.value)}
					onBlur={() => setFavFoodTouched(true)}
				/>
				{favFoodTouched ? <div className="message"> {favFoodErrorMessage} </div> : null}

				<label>Hamstern Älskar Att:</label>
				<input
					type="text"
					className={lovesClass}
					placeholder="Favorit syssla..."
					value={loves}
					onChange={(event) => setLoves(event.target.value)}
					onBlur={() => setLovesTouched(true)}
				/>
				{lovesTouched ? <div className="message"> {lovesErrorMessage} </div> : null}

				{!isPending && <button type="submit" disabled={isInvalidForm}>Ladda upp Hamster</button>}
				{isPending && <button disabled>Laddar Hamster...</button>}
			</form>
		</div>
	)
}

export default UploadNewHamster
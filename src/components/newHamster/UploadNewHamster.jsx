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
		ageErrorMessage = "Please write age between 1 and 6.";
	}
	let ageClass = "";
	if (ageTouched) {
		ageClass = isValidAge ? "valid" : "error";
	}

	let isValidFavFood = true;
	let favFoodErrorMessage = "";
	if (favFood === "" || !isNaN(Number(favFood))) {
		isValidFavFood = false;
		favFoodErrorMessage = "Please write hamster's favourite food.";
	}
	let favFoodClass = "";
	if (favFoodTouched) {
		favFoodClass = isValidFavFood ? "valid" : "error";
	}

	let isValidLoves = true;
	let lovesErrorMessage = "";
	if (loves === "" || !isNaN(Number(loves))) {
		isValidLoves = false;
		lovesErrorMessage = "Please describe hamster's favourite activity.";
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
			const formData = await response.json();
			history.push(`/HamsterProfile/${formData.id}`)

		} catch (error) {
			return error.message;
		}
	}

	return (
		<div className='form-component'>
			<h2>Upload New Hamster</h2>

			<form onSubmit={handleSubmit} className="upload-form">

				<label>Hamsters Name:</label>
				<input
					type="text"
					className={nameClass}
					placeholder="Enter name..."
					value={name}
					onChange={(event) => setName(event.target.value)}
					onBlur={() => setNameTouched(true)}
				/>
				{nameTouched ? <div className="message"> {nameErrorMessage} </div> : null}

				<label>Hamsters Age:</label>
				<input
					type="text"
					className={ageClass}
					placeholder="Enter age..."
					value={age}
					onChange={(event) => setAge(event.target.value)}
					onBlur={() => setAgeTouched(true)}
				/>
				{ageTouched ? <div className="message"> {ageErrorMessage} </div> : null}

				<label>Hamsters Favorit Food:</label>
				<input
					type="text"
					className={favFoodClass}
					placeholder="Enter favourite food..."
					value={favFood}
					onChange={(event) => setFavfood(event.target.value)}
					onBlur={() => setFavFoodTouched(true)}
				/>
				{favFoodTouched ? <div className="message"> {favFoodErrorMessage} </div> : null}

				<label>Hamster Loves:</label>
				<input
					type="text"
					className={lovesClass}
					placeholder="Enter what hamster loves..."
					value={loves}
					onChange={(event) => setLoves(event.target.value)}
					onBlur={() => setLovesTouched(true)}
				/>
				{lovesTouched ? <div className="message"> {lovesErrorMessage} </div> : null}

				{!isPending && <button type="submit" disabled={isInvalidForm}>Upload Hamster</button>}
				{isPending && <button disabled>Uploading Hamster...</button>}
			</form>
		</div>
	)
}

export default UploadNewHamster
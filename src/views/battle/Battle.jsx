// Vg del spara data för matcher 

import { useState, useEffect } from 'react';
import HamsterCard from "../../components/HamsterCard";
import ModalWinner from "../modalViews/ModalWinner";
import "./battle.css"


const Battle = () => {

	const [hamsterOne, setHamsterOne] = useState([]);
	const [hamsterTwo, setHamsterTwo] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [newGame, setNewGame] = useState(true);
	const [isShowing, setIsShowing] = useState(false);
	const [hamsterWins, setHamsterWins] = useState([]);
	const [hamsterLoser, setHamsterLoser] = useState([]);
	console.log(hamsterOne.id, hamsterOne.name);
	console.log(hamsterTwo.id, hamsterTwo.name);

	function toggle() {
		setIsShowing(!isShowing);
	}


	useEffect(() => {
		const fetchRandomHamster = async () => {
			try {
				setIsLoaded(true);
				const responseOne = await fetch('/hamsters/random', { method: 'GET' });
				const resultOme = await responseOne.json();

				const responseTwo = await fetch('/hamsters/random', { method: 'GET' });
				const resultTwo = await responseTwo.json();

				if (resultOme.id === resultTwo.id) {
					console.log("Two of the same!")
					newGame ? setNewGame(false) : setNewGame(true);

				} else {
					setHamsterOne(resultOme)
					setHamsterTwo(resultTwo)
				}

				setIsLoaded(false);
			} catch (error) {
				setIsLoaded(false);
				setError(error.message)
				return error.message;
			}
		};
		fetchRandomHamster();
	}, [newGame]);


	const handleClick = async (winner, loser) => {

		if (winner && loser) {
			const winnerUpdate = {
				wins: winner.wins + 1,
				games: winner.games + 1
			}
			const loserUpdate = {
				defeats: loser.defeats + 1,
				games: loser.games + 1
			}

			// console.log('Winner', winner.name, winner.id, winnerUpdate,);
			// console.log('Loser', loser.name, loser.id, loserUpdate);

			setHamsterWins(winner)
			setHamsterLoser(loser)
			// toggle(isShowing, winner.id)
			updateHamster(winner.id, winnerUpdate);
			updateHamster(loser.id, loserUpdate);
			newMatchPost(winner.id, loser.id);
			toggle(isShowing)
			setNewGame(!newGame)

		}
	}

	const updateHamster = async (id, upDate) => {

		try {
			const response = await fetch(`/hamsters/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(upDate)
			});
			const hamsterData = await response.json();
			console.log('hej', hamsterData);

		} catch (error) {
			return error.message;
		}
	};

	const newMatchPost = async (winner, loser) => {

		const newMatch = {
			winnerId: winner,
			loserId: loser
		}

		try {
			const response = await fetch('/matches', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newMatch)
			});
			const matchData = await response.json();
			console.log('då', matchData);

		} catch (error) {
			return error.message;
		}
	};

	return (
		<div className="battle">
			<h1> Battle </h1>
			{ isLoaded ? <p>Loading...</p> : <>
				{error && <div>{error}</div>}
				<article className="contestants">

					<div className="battle-card">
						<HamsterCard
							imgName={hamsterOne.imgName}
							name={`Name: ${hamsterOne.name}`}
							age={`Age: ${hamsterOne.age}`}
							favFood={`Favorit Food: ${hamsterOne.favFood}`}
							loves={`Loves: ${hamsterOne.loves}`}
						/>
						<button onClick={() => handleClick(hamsterOne, hamsterTwo)}>
							Pick {hamsterOne.name}
						</button>
					</div>


					<div >
						<HamsterCard
							imgName={hamsterTwo.imgName}
							name={`Name: ${hamsterTwo.name}`}
							age={`Age: ${hamsterTwo.age}`}
							favFood={`Favorit Food: ${hamsterTwo.favFood}`}
							loves={`Loves: ${hamsterTwo.loves}`}
						/>
						<button onClick={() => handleClick(hamsterTwo, hamsterOne)}>
							Pick {hamsterTwo.name}
						</button>
					</div>

				</article>

			</>}
			<ModalWinner
				isShowing={isShowing}
				hide={toggle}
				hamsterWins={hamsterWins}
				hamsterLoser={hamsterLoser}
			/>

			<button onClick={() => setNewGame(!newGame)}>Two New Hamsters</button>
		</div>
	)
}

export default Battle

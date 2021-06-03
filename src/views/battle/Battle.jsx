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
                const responseTwo = await fetch('/hamsters/random', { method: 'GET' });

                if (!responseOne.ok || !responseTwo.ok) {
                    if (responseOne.status === 500 || responseTwo.status === 500) {
                        console.log('500 (internal server error)')
                        throw Error('Could not fetch the data for that resourse.  Please try again')
                    }
                    throw Error('Oh No! Someting went wrong! The error has to do with status code:', responseOne.status, 'Please try again')
                }

                const resultOne = await responseOne.json();
                const resultTwo = await responseTwo.json();

				if (resultOne.id === resultTwo.id) {
					console.log("Two of the same!")
					newGame ? setNewGame(false) : setNewGame(true);

				} else {
					setHamsterOne(resultOne)
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
		<div className="battle-wrapper">
			<h1> Vem är sötast? </h1>
			{ isLoaded ? <p>Laddar...</p> : <>
				{error && <div>{error}</div>}
				<article className="contestants">
					<div className="battle-card-one">
						<HamsterCard
							imgName={hamsterOne.imgName}
							name={`Namn: ${hamsterOne.name}`}
							age={`Ålder: ${hamsterOne.age}`}
							favFood={`Favorit mat: ${hamsterOne.favFood}`}
							loves={`Älskar att: ${hamsterOne.loves}`}
						/>
						<button onClick={() => handleClick(hamsterOne, hamsterTwo)}>
							Jag väljer {hamsterOne.name}
						</button>
					</div>
					<div className="battle-card-two">
						<HamsterCard
							imgName={hamsterTwo.imgName}
							name={`Namn: ${hamsterTwo.name}`}
							age={`Ålder: ${hamsterTwo.age}`}
							favFood={`Favorit mat: ${hamsterTwo.favFood}`}
							loves={`Älskar att: ${hamsterTwo.loves}`}
						/>
						<button onClick={() => handleClick(hamsterTwo, hamsterOne)}>
							Jag väljer {hamsterTwo.name}
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
			<button onClick={() => setNewGame(!newGame)}>Två nya hamstrar</button>
		</div>
	)
}

export default Battle

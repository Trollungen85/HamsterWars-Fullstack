import { useState, useEffect } from 'react';

const useFetch = () => {
	const [hamsterOne, setHamsterOne] = useState({});
	const [hamsterTwo, setHamsterTwo] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);

	//On params changes
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

				setIsLoaded(false);

				if (resultOne.id === resultTwo.id) {
					console.log("Two of the same!")
					newGame ? setNewGame(false) : setNewGame(true);

				} else {
					setHamsterOne(resultOne)
					setHamsterTwo(resultTwo)
				}
			} catch (error) {
				setIsLoaded(false);
				setError(error.message)
				return error.message;
			}
		};
		fetchRandomHamster();
	}, []);
	//console.log(hamsterTwo, hamsterOne);
	return { hamsterOne, hamsterTwo, isLoaded, error }
}

export default useFetch
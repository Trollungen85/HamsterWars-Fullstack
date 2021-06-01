import { useState, useEffect } from 'react';

const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			try {
				setIsLoaded(true);
				const response = await fetch(url, { method: 'GET' });
				const result = await response.json();

				setIsLoaded(false);
				setData(result)
				//console.log(result);

			} catch (error) {
				setIsLoaded(false);
				setError(error.message)
				return error.message;
			}
		};
		fetchData();
	}, [url])
	return { data, isLoaded, error }
}

export default useFetch

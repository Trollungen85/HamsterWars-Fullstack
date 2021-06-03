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

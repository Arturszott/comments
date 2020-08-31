import { useEffect, useState } from 'react';

function useFetch({ url, initialData }) {
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	if (!url) throw new Error('Url has to be provided');

	useEffect(() => {
		setLoading(true);

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [url]);

	return { data, error, loading };
}

export default useFetch;

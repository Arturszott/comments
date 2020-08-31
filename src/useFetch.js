import { useEffect, useState } from 'react';

function useFetch({ url, initialData, skip }) {
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	if (!url) throw new Error('Url has to be provided');

	useEffect(() => {
		if (skip) return;
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
	}, [url, skip]);

	return { data, error, loading };
}

export default useFetch;

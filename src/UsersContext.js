import React, { useState, useContext, useEffect } from 'react';

import useFetch from './useFetch';

export const UsersContext = React.createContext({});

function UsersContextProvider(props) {
	const { data: users, loading, error } = useFetch({
		url: `https://jsonplaceholder.typicode.com/users`,
		initialData: []
	});
	const [usersById, setUsersById] = useState([]);

	useEffect(() => {
		setUsersById(
			users.reduce((acc, user) => {
				return { ...acc, [user.id]: user };
			}, {})
		);
	}, [users]);

	return <UsersContext.Provider value={{ usersById, loading }}>{props.children}</UsersContext.Provider>;
}

export const useUsersContext = () => {
	return useContext(UsersContext);
};

export default React.memo(UsersContextProvider);

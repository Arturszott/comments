import React from 'react';
import { render } from '@testing-library/react';
import Posts from './Posts';
import { UsersContext } from './UsersContext';
import useFetch from './useFetch';

jest.mock('./useFetch');

test('renders posts', () => {
	useFetch.mockImplementation(() => ({
		loading: false,
		data: [
			{
				id: 1,
				title: 'Post title',
				userId: 1,
				body: ''
			},
			{
				id: 2,
				title: 'Another title',
				userId: 1,
				body: ''
			}
		],
		error: null
	}));

	const { getAllByText } = render(
		<UsersContext.Provider value={{ usersById: { 1: 'Artur' } }}>
			<Posts />
		</UsersContext.Provider>
	);
	const post = getAllByText(/title/i);

	expect(post).toHaveLength(2);
});

test('renders no posts if there arent any for selected user', () => {
	useFetch.mockImplementation(() => ({
		loading: false,
		data: [
			{
				id: 1,
				title: 'Post title',
				userId: 1,
				body: ''
			}
		],
		error: null
	}));

	const { queryByText } = render(
		<UsersContext.Provider value={{ usersById: { 1: 'Jean' } }}>
			<Posts selectedUserId={'2'} />
		</UsersContext.Provider>
	);
	const post = queryByText(/Post title/i);

	expect(post).toBeNull();
});

test('renders posts only selected user', () => {
	useFetch.mockImplementation(() => ({
		loading: false,
		data: [
			{
				id: 1,
				title: 'Post title',
				userId: 1,
				body: ''
			},
			{
				id: 1,
				title: 'Second post',
				userId: 2,
				body: ''
			}
		],
		error: null
	}));

	const { getByText } = render(
		<UsersContext.Provider value={{ usersById: { 2: 'David' } }}>
			<Posts selectedUserId={'2'} />
		</UsersContext.Provider>
	);
	const post = getByText(/Second post/i);

	expect(post).toBeInTheDocument();
});

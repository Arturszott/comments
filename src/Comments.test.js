import React from 'react';
import { render } from '@testing-library/react';
import Comments from './Comments';
import { UsersContext } from './UsersContext';
import { TagContext } from './TagContext';
import { AdminCommentContext } from './AdminCommentContext';
import useFetch from './useFetch';

jest.mock('./useFetch');

const prepare = ({ commentsById, tagsById, tagsByCommentId, selectedTagIds }) => {
	return render(
		<AdminCommentContext.Provider value={{ commentsById }}>
			<TagContext.Provider value={{ tagsById, tagsByCommentId }}>
				<UsersContext.Provider value={{ usersById: { 1: 'Artur' } }}>
					<Comments selectedTagIds={selectedTagIds} />
				</UsersContext.Provider>
			</TagContext.Provider>
		</AdminCommentContext.Provider>
	);
};
test('renders comments', () => {
	useFetch.mockImplementation(() => ({
		loading: false,
		data: [
			{
				id: 1,
				userId: 1,
				body: 'I love it'
			},
			{
				id: 2,
				userId: 1,
				body: 'When sun goes down'
			}
		],
		error: null
	}));
	const commentsById = {};
	const tagsById = {};
	const tagsByCommentId = {};
	const selectedTagIds = [];

	const { getAllByTestId } = prepare({ commentsById, tagsById, tagsByCommentId, selectedTagIds });
	const comments = getAllByTestId('comment');

	expect(comments).toHaveLength(2);
});

test('renders only comments for selected tags', () => {
	useFetch.mockImplementation(() => ({
		loading: false,
		data: [
			{
				id: 1,
				userId: 1,
				body: 'I love it'
			},
			{
				id: 2,
				userId: 1,
				body: 'When sun goes down'
			}
		],
		error: null
	}));
	const commentsById = {};
	const tagsById = {
		1: { name: 'Awesome' }
	};
	const tagsByCommentId = {
		1: [1]
	};
	const selectedTagIds = [1];

	const { getAllByTestId } = prepare({ commentsById, tagsById, tagsByCommentId, selectedTagIds });
	const comments = getAllByTestId('comment');

	expect(comments).toHaveLength(1);
});

test('renders graph displaying top three tags within comments', () => {
	useFetch.mockImplementation(() => ({
		loading: false,
		data: [
			{
				id: 1,
				userId: 1,
				body: 'I love it'
			},
			{
				id: 2,
				userId: 1,
				body: 'Push the tempo'
			},
			{
				id: 3,
				userId: 1,
				body: 'Exciting'
			},
			{
				id: 4,
				userId: 1,
				body: 'Oh my...'
			},
			{
				id: 5,
				userId: 1,
				body: 'Praise the sun!'
			}
		],
		error: null
	}));
	const commentsById = {};
	const tagsById = {
		1: { name: 'Awesome' },
		2: { name: 'Boring' },
		3: { name: 'Clever' },
		4: { name: 'SPAM' },
		5: { name: 'Other' }
	};
	const tagsByCommentId = {
		1: [1, 5],
		2: [1, 5],
		3: [1],
		4: [2]
	};
	const selectedTagIds = ['1'];

	const { getByText, queryByText } = prepare({ commentsById, tagsById, tagsByCommentId, selectedTagIds });

	getByText('Awesome: 3');
	getByText('Other: 2');
	getByText('Boring: 1');

	expect(queryByText('SPAM: 1')).toBeNull();
});

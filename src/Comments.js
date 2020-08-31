import React from 'react';
import styled from 'styled-components/macro';

import useFetch from './useFetch';

import Comment from './Comment';
import Spinner from './Spinner';

const CommentsWrapper = styled.section`
	display: flex;
	flex-direction: column;
	flex: 2;
	background-color: #0a1222;
	align-items: center;
	overflow: auto;
	padding: 10px;
`;

function Comments({ postId }) {
	const { data: comments, loading, error } = useFetch({
		url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
		initialData: [],
		skip: !postId
	});

	return (
		<CommentsWrapper>
			{loading && <Spinner />}
			{!loading &&
				comments.map((post) => {
					return <Comment {...post} key={post.id} />;
				})}
		</CommentsWrapper>
	);
}

export default Comments;

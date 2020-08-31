import React from 'react';
import styled from 'styled-components/macro';

import useFetch from './useFetch';

import Post from './Post';
import Spinner from './Spinner';

const PostsWrapper = styled.section`
	display: flex;
	flex-direction: column;
	flex: 2;
	background-color: #0a1222;
	overflow: auto;
`;

function Posts() {
	const { data: posts, loading, error } = useFetch({ url: 'http://jsonplaceholder.typicode.com/posts' });

	if (loading) {
		return <Spinner />;
	}

	return (
		<PostsWrapper>
			{posts.map((post) => {
				return <Post {...post} key={post.id} />;
			})}
		</PostsWrapper>
	);
}

export default Posts;

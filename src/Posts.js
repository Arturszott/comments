import React, { useState } from 'react';
import styled from 'styled-components/macro';

import useFetch from './useFetch';

import Post from './Post';
import Spinner from './Spinner';

const PostsWrapper = styled.section`
	display: flex;
	flex-direction: column;
	flex: 2;
	overflow: auto;
	background-color: #0e1729;
	padding: 10px;
	align-items: center;
`;

function Posts({ setActivePostId, activePostId }) {
	const { data: posts, loading, error } = useFetch({
		url: 'http://jsonplaceholder.typicode.com/posts',
		initialData: []
	});

	return (
		<PostsWrapper>
			{loading && <Spinner />}
			{posts.map((post) => {
				return (
					<Post
						{...post}
						key={post.id}
						isActive={Boolean(activePostId) && activePostId === post.id}
						setActivePost={setActivePostId}
					/>
				);
			})}
		</PostsWrapper>
	);
}

export default Posts;

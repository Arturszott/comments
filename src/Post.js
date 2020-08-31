import React from 'react';
import styled from 'styled-components/macro';

const PostWrapper = styled.article`
	display: flex;
	flex-direction: column;
	background-color: #0e1729;
	padding: 20px;
`;

const Title = styled.h1`
	color: white;

	::first-letter {
		text-transform: capitalize;
	}
`;

const P = styled.p`
	color: white;

	::first-letter {
		text-transform: capitalize;
	}
`;

function Post({ title, body, id, userId }) {
	return (
		<PostWrapper>
			<Title>{title}</Title>
			<P>{body}</P>
		</PostWrapper>
	);
}

export default Post;

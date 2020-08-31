import React from 'react';
import styled from 'styled-components/macro';

const CommentWrapper = styled.article`
	display: flex;
	flex-direction: column;
	padding: 20px;
	margin-bottom: 10px;

	background: white;
	border-radius: 5px;
	cursor: pointer;
`;

const P = styled.p`
	color: black;

	::first-letter {
		text-transform: capitalize;
	}
`;

function Comment({ body, id, userId }) {
	return (
		<CommentWrapper>
			<P>{body}</P>
		</CommentWrapper>
	);
}

export default React.memo(Comment);

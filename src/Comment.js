import React from 'react';
import styled from 'styled-components/macro';

import { useTagContext } from './TagContext';

const CommentWrapper = styled.article`
	display: flex;
	flex-direction: column;
	padding: 10px;
	padding-bottom: 30px;
	margin-bottom: 10px;

	background: white;
	border-radius: 5px;
`;

const P = styled.p`
	color: black;

	::first-letter {
		text-transform: capitalize;
	}
`;

function Comment({ body, id, userId }) {
	const { getSuggestions } = useTagContext();
	// TEST suggestions:
	console.log(getSuggestions('S'));
	return (
		<CommentWrapper>
			<P>{body}</P>
		</CommentWrapper>
	);
}

export default React.memo(Comment);

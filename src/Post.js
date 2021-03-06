import React, { useCallback } from 'react';
import styled from 'styled-components/macro';

import { useUsersContext } from './UsersContext';

const PostWrapper = styled.article`
	display: flex;
	flex-direction: column;
	padding: 20px;
	margin-bottom: 10px;

	border: 1px solid #e396b1;
	border-radius: 5px;
	cursor: pointer;
	position: relative;

	transition: background-color 0.2s ease;

	&:hover {
		background-color: #11203d;
	}

	::after {
		transition: opacity 0.2s ease;
		content: '';
		display: block;
		background: #e396b1;
		height: 100%;
		width: 6px;
		position: absolute;
		right: 0;
		top: 0;
		opacity: ${({ isActive }) => (isActive ? 1 : 0)};
	}
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

function Post({ title, body, id, userId, isActive, setActivePost }) {
	const { usersById } = useUsersContext();
	const setToActive = useCallback(() => {
		setActivePost(id);
	}, [id, setActivePost]);

	const userName = usersById[userId] && usersById[userId].username;

	return (
		<PostWrapper isActive={isActive} onClick={setToActive}>
			<Title>{title}</Title>
			<P>{body}</P>
			<P>Author: {userName}</P>
		</PostWrapper>
	);
}

export default React.memo(Post);

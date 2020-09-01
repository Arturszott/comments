import React, { useMemo } from 'react';
import styled from 'styled-components/macro';

import { useTagContext } from './TagContext';
import { useUsersContext } from './UsersContext';

const FiltersWrapper = styled.section`
	display: flex;
	padding: 10px;
	font-size: 13px;
	background-color: #0a1222;
	border-bottom: 1px solid #513f54;
	color: pink;
`;
const Column = styled.div`
	flex: 1;
`;

function Filters({ selectedTagIds, setSelectedTagIds, setSelectedUserId, selectedUserId }) {
	const { tagsById } = useTagContext();
	const { usersById } = useUsersContext();

	const tags = useMemo(() => Object.values(tagsById), [tagsById]);
	const users = useMemo(() => Object.values(usersById), [usersById]);

	return (
		<FiltersWrapper>
			<Column>
				Filter by user:{' '}
				<select
					value={selectedUserId === null ? '' : selectedUserId}
					onChange={(event) => {
						setSelectedUserId(event.target.value);
					}}
				>
					<option value="">All users</option>
					{users.map((user) => (
						<option value={user.id} key={user.id}>
							{user.username}
						</option>
					))}
				</select>
				<button disabled={selectedUserId === null} onClick={() => setSelectedUserId(null)}>
					Clear
				</button>{' '}
			</Column>
			<Column>
				<select
					value={''}
					onChange={(event) => {
						setSelectedTagIds([...selectedTagIds, event.target.value]);
					}}
				>
					<option value="">Filter comments by tag</option>
					{tags
						.filter((tag) => !selectedTagIds.includes(tag.id))
						.map((tag) => (
							<option value={tag.id} key={tag.id}>
								{tag.name}
							</option>
						))}
				</select>
				<button disabled={selectedTagIds.length === 0} onClick={() => setSelectedTagIds([])}>
					Clear
				</button>{' '}
				{selectedTagIds.map((tagId) => tagsById[tagId].name).join(', ')}
			</Column>
		</FiltersWrapper>
	);
}

export default Filters;

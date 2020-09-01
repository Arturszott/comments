import React, { useState, useMemo } from 'react';
import styled from 'styled-components/macro';

import { useTagContext } from './TagContext';

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

function Filters({ selectedTagIds, setSelectedTagIds }) {
	const { tagsById } = useTagContext();

	const tags = useMemo(() => Object.values(tagsById), [tagsById]);

	return (
		<FiltersWrapper>
			<Column></Column>
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

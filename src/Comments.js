import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { PieChart } from 'react-minimal-pie-chart';

import useFetch from './useFetch';
import { useTagContext } from './TagContext';

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

const GraphWrapper = styled.section`
	display: flex;
	flex-direction: column;
	background-color: #0a1222;
	align-items: center;
	padding: 10px;
`;

const NoResults = styled.section`
	display: flex;
	flex-direction: column;
	background-color: #0a1222;
	color: pink;
	align-items: center;
	padding: 5px;
`;

const labelStyle = {
	padding: '2px',
	fill: '#fff',
	fontSize: '4px',
	fontWeight: 'bold'
};

function Comments({ postId, selectedTagIds }) {
	const { tagsByCommentId, tagsById } = useTagContext();
	const { data: comments, loading, error } = useFetch({
		url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
		initialData: [],
		skip: !postId
	});

	const topThreeTags = useMemo(() => {
		const count = {};

		comments.forEach((comment) => {
			const tagIds = tagsByCommentId[comment.id] || [];

			tagIds.forEach((tagId) => {
				count[tagId] = count[tagId] === undefined ? 1 : count[tagId] + 1;
			});
		});
		const colors = ['#FFA7C4', '#E15B87', '#CA265C'];

		return Object.entries(count)
			.sort((a, b) => a[1] - b[1])
			.slice(0, 3)
			.map(([tagId, number], i) => {
				return {
					title: tagsById[tagId].name,
					value: number,
					color: colors[i]
				};
			});
	}, [comments, tagsByCommentId, tagsById]);

	const filteredComments = comments.filter((comment) => {
		const commentTags = tagsByCommentId[comment.id];

		if (selectedTagIds.length > 0 && !commentTags) {
			return false;
		}

		return selectedTagIds.every((tagId) => tagsByCommentId[comment.id].includes(tagId));
	});

	return (
		<CommentsWrapper>
			{loading && <Spinner />}
			{!loading && selectedTagIds.length > 0 && filteredComments.length === 0 && (
				<NoResults>No comments for selected filters</NoResults>
			)}
			{!loading && comments.length > 0 && (
				<GraphWrapper>
					<PieChart
						data={topThreeTags}
						startAngle={60}
						labelPosition={50}
						radius={30}
						label={({ dataEntry }) => dataEntry.title + ': ' + dataEntry.value}
						labelStyle={labelStyle}
					/>
					;
				</GraphWrapper>
			)}
			{!loading &&
				filteredComments.map((post) => {
					return <Comment {...post} key={post.id} />;
				})}
		</CommentsWrapper>
	);
}

export default React.memo(Comments);

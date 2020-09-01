import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

import { useTagContext } from './TagContext';
import { useAdminCommentContext } from './AdminCommentContext';

const CommentWrapper = styled.article`
	display: flex;
	flex-direction: column;
	position: relative;
`;

const CommentPanel = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	right: 30px;

	transform: translateY(${({ isVisible }) => (isVisible ? '-30px' : '40px')});
	opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
	pointer-events: ${({ isVisible }) => (isVisible ? 'inherit' : 'none')};
	z-index: 10;
`;

const CommentActions = styled.div`
	display: flex;
`;

const AdminComment = styled.span`
	padding: 5px 0;
	color: gray;
	display: block;
	font-style: italic;
`;

const CommentBody = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	padding-bottom: 30px;
	margin-top: 10px;

	background: white;
	border-radius: 5px;
`;

const P = styled.p`
	color: black;

	::first-letter {
		text-transform: capitalize;
	}
`;
const TagList = styled.div`
	position: absolute;
	top: 24px;
	background: white;
	word-break: break-all;
	padding: 4px;
	box-shadow: 0px 3px 7px 0px #00000026;
	border-radius: 7px;
`;
const Tag = styled.span`
	display: inline-block;
	color: white;
	padding: 2px;
	background: pink;
	margin-right: 2px;
	margin-bottom: 2px;
	border-radius: 2px;
	white-space: nowrap;
	font-size: 11px;

	${({ isInteractive }) =>
		isInteractive
			? `
		cursor: pointer;

		&:hover {
			background-color: #cc7f8d;
		}
	`
			: ''}
`;

const ACTIONS = {
	COMMENT: 'COMMENT',
	TAG: 'TAG'
};

function Comment({ body, id, userId }) {
	const { getSuggestions, tagsByCommentId, tagsById, tagComment } = useTagContext();
	const { addComment, commentsById } = useAdminCommentContext();
	const [actionToTake, setAction] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const [selectedTagIds, setSelectedTagsIds] = useState([]);
	const [suggestedTags, setSuggestedTags] = useState([]);
	const adminComment = commentsById[id];
	const commentTags = tagsByCommentId[id];

	useEffect(() => {
		if (!actionToTake) {
			if (inputValue) {
				setInputValue('');
			}

			if (selectedTagIds.length > 0) {
				setSelectedTagsIds([]);
			}
		}
	}, [actionToTake]);

	return (
		<CommentWrapper>
			<CommentBody>
				<P>
					{body}
					{adminComment && <AdminComment>Comment: {adminComment.text}</AdminComment>}
				</P>
				<div>{commentTags && commentTags.map((tagId) => <Tag key={tagId}>{tagsById[tagId].name}</Tag>)}</div>

				<CommentActions>
					{!adminComment && <button onClick={() => setAction(ACTIONS.COMMENT)}>Comment</button>}
					{!commentTags && <button onClick={() => setAction(ACTIONS.TAG)}>Tag</button>}
				</CommentActions>
			</CommentBody>

			<CommentPanel isVisible={actionToTake}>
				{actionToTake === ACTIONS.COMMENT && (
					<>
						<input
							placeholder="Write comment"
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
						/>
						<button
							disabled={inputValue.length === 0}
							onClick={() => {
								addComment(id, inputValue);
								setAction(null);
							}}
						>
							Send
						</button>
					</>
				)}
				{actionToTake === ACTIONS.TAG && (
					<>
						<div>
							{selectedTagIds.map((tagId) => (
								<Tag key={tagId}>{tagsById[tagId].name}</Tag>
							))}
							<input
								placeholder="Add Tags"
								value={inputValue}
								onFocus={() => {
									setSuggestedTags(getSuggestions(inputValue));
								}}
								onChange={(event) => {
									setInputValue(event.target.value);
									setSuggestedTags(getSuggestions(event.target.value));
								}}
							/>
							<button
								disabled={selectedTagIds.length === 0}
								onClick={() => {
									tagComment(id, selectedTagIds);
									setAction(null);
								}}
							>
								Add Tags
							</button>
						</div>
						<TagList>
							{suggestedTags
								.filter((tag) => !selectedTagIds.includes(tag.id))
								.map((tag) => (
									<Tag
										isInteractive
										key={tag.id}
										onClick={() => {
											setSelectedTagsIds([...selectedTagIds, tag.id]);
										}}
									>
										{tag.name}
									</Tag>
								))}
						</TagList>
					</>
				)}
				<button onClick={() => setAction(null)}>Close</button>
			</CommentPanel>
		</CommentWrapper>
	);
}

export default React.memo(Comment);

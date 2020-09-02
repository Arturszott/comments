import React, { useState, useMemo, useContext } from 'react';

export const AdminCommentContext = React.createContext({});

function AdminCommentContextProvider(props) {
	const [commentsById, setCommentsById] = useState({});

	const value = useMemo(
		() => ({
			addComment(commentId, text) {
				setCommentsById({ ...commentsById, [commentId]: { id: commentId, text } });
			},
			commentsById
		}),
		[commentsById]
	);

	return <AdminCommentContext.Provider value={value}>{props.children}</AdminCommentContext.Provider>;
}

export const useAdminCommentContext = () => {
	return useContext(AdminCommentContext);
};

export default React.memo(AdminCommentContextProvider);

import React, { useState } from 'react';
import styled from 'styled-components/macro';

import Posts from './Posts';
import Comments from './Comments';
import Filters from './Filters';
import TagContextProvider from './TagContext';
import UsersContextProvider from './UsersContext';
import AdminCommentContextProvider from './AdminCommentContext';

const AppWrapper = styled.main`
	display: flex;
	height: 100vh;
`;

function App() {
	const [activePostId, setActivePostId] = useState(null);
	const [selectedTagIds, setSelectedTagIds] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);

	return (
		<AdminCommentContextProvider>
			<UsersContextProvider>
				<TagContextProvider>
					<Filters
						selectedTagIds={selectedTagIds}
						setSelectedTagIds={setSelectedTagIds}
						setSelectedUserId={setSelectedUserId}
						selectedUserId={selectedUserId}
					/>
					<AppWrapper>
						<Posts
							activePostId={activePostId}
							setActivePostId={setActivePostId}
							selectedUserId={selectedUserId}
						/>
						<Comments postId={activePostId} selectedTagIds={selectedTagIds} />
					</AppWrapper>
				</TagContextProvider>
			</UsersContextProvider>
		</AdminCommentContextProvider>
	);
}

export default App;

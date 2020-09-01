import React, { useState } from 'react';
import styled from 'styled-components/macro';

import Posts from './Posts';
import Comments from './Comments';
import Filters from './Filters';
import TagContextProvider from './TagContext';
import AdminCommentContextProvider from './AdminCommentContext';

const AppWrapper = styled.main`
	display: flex;
	height: 100vh;
`;

function App() {
	const [activePostId, setActivePostId] = useState(null);
	const [selectedTagIds, setSelectedTagIds] = useState([]);

	return (
		<AdminCommentContextProvider>
			<TagContextProvider>
				<Filters selectedTagIds={selectedTagIds} setSelectedTagIds={setSelectedTagIds} />
				<AppWrapper>
					<Posts activePostId={activePostId} setActivePostId={setActivePostId} />
					<Comments postId={activePostId} selectedTagIds={selectedTagIds} />
				</AppWrapper>
			</TagContextProvider>
		</AdminCommentContextProvider>
	);
}

export default App;

import React, { useState } from 'react';
import styled from 'styled-components/macro';

import Posts from './Posts';
import Comments from './Comments';
import TagContextProvider from './TagContext';
import AdminCommentContextProvider from './AdminCommentContext';

const AppWrapper = styled.main`
	display: flex;
	height: 100vh;
`;

function App() {
	const [activePostId, setActivePostId] = useState(null);

	return (
		<AdminCommentContextProvider>
			<TagContextProvider>
				<AppWrapper>
					<Posts activePostId={activePostId} setActivePostId={setActivePostId}></Posts>
					<Comments postId={activePostId}></Comments>
				</AppWrapper>
			</TagContextProvider>
		</AdminCommentContextProvider>
	);
}

export default App;

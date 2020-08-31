import React, { useState } from 'react';
import styled from 'styled-components/macro';

import Posts from './Posts';
import Comments from './Comments';
import TagContextProvider from './TagContext';

const AppWrapper = styled.main`
	display: flex;
	height: 100vh;
`;

function App() {
	const [activePostId, setActivePostId] = useState(null);

	return (
		<TagContextProvider>
			<AppWrapper>
				<Posts activePostId={activePostId} setActivePostId={setActivePostId}></Posts>
				<Comments postId={activePostId}></Comments>
			</AppWrapper>
		</TagContextProvider>
	);
}

export default App;

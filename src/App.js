import React, { useState } from 'react';
import styled from 'styled-components/macro';

import Posts from './Posts';
import Comments from './Comments';

const AppWrapper = styled.main`
	display: flex;
	height: 100vh;
`;

function App() {
	const [activePostId, setActivePostId] = useState(null);

	return (
		<AppWrapper>
			<Posts activePostId={activePostId} setActivePostId={setActivePostId}></Posts>
			<Comments postId={activePostId}></Comments>
		</AppWrapper>
	);
}

export default App;

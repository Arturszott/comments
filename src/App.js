import React from 'react';
import styled from 'styled-components/macro';

import Posts from './Posts';
const AppWrapper = styled.main`
	display: flex;
	height: 100vh;
`;

const Comments = styled.section`
	display: flex;
	flex: 1;
	background-color: #0a1222;
`;

function App() {
	return (
		<AppWrapper>
			<Posts></Posts>
			<Comments></Comments>
		</AppWrapper>
	);
}

export default App;

import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components/macro';

import './App.css';

const AppWrapper = styled.main`
	display: flex;
	height: 100vh;
`;

const Posts = styled.section`
	display: flex;
	flex: 2;
	background-color: #0e1729;
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

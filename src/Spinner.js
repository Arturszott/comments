import React from 'react';
import styled from 'styled-components/macro';

const SpinnerAnimated = styled.div`
	display: inline-block;
	margin-top: 10px;
	margin-bottom: 10px;

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	animation: spin 0.3s linear 0s infinite;
`;

function Spinner({ size = 20 }) {
	return (
		<SpinnerAnimated>
			<svg width={size} height={size} viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M41 82C63.6437 82 82 63.6437 82 41C82 18.3563 63.6437 0 41 0C18.3563 0 0 18.3563 0 41C0 63.6437 18.3563 82 41 82ZM41 65C54.2548 65 65 54.2548 65 41C65 27.7452 54.2548 17 41 17C27.7452 17 17 27.7452 17 41C17 54.2548 27.7452 65 41 65Z"
					fill="#8EACE3"
				/>
				<circle cx="55" cy="41" r="5" fill="white" />
			</svg>
		</SpinnerAnimated>
	);
}

export default Spinner;

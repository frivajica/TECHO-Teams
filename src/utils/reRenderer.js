import { useState } from 'react';

export const useReRenderer = () => {
	const [renderKey, setRenderKey] = useState(false);
	const reRender = () => {
		setRenderKey(!renderKey);
	};
	return {renderKey, reRender}
};
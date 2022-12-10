import React, { useState } from 'react';
import DynamicIcon from './DynamicIcon';

export default function App() {
	const [icon, setIcon] = useState('');
	const [showIcon, setShowIcon] = useState(false);

	const changeIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (showIcon) setShowIcon(false);
		setIcon(event.target.value);
	};

	return (
		<div className='App'>
			<label>Input icon name in the format "directory/iconName ie Fa/FaFileExcel"</label>
			<input type='text' onChange={(event) => changeIcon(event)} />
			<button onClick={() => setShowIcon(true)}>Show Icon</button>
			<br />

			{showIcon && (
				<DynamicIcon
					icon={icon}
					size='2em'
					color='black'
					loadingIcon={<span>...</span>}
					fallbackIcon='fa/FaRegFileImage'
				/>
			)}
		</div>
	);
}

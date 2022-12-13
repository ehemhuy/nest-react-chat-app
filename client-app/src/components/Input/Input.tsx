import React from 'react';
import { BaseProps } from '../../interfaces/baseProps';

interface InputProps extends BaseProps {
	value?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

function Input(props: InputProps) {
	const { value, onChange } = props;
	return (
		<input
			onChange={onChange}
			value={value}
			className='h-10 rounded-lg border-gray-600 border-2 focus:border-purple-600 hover:border-purple-600 outline-none p-2'
		/>
	);
}

export default Input;

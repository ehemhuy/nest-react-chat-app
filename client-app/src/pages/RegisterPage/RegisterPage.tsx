import { Button, ButtonSpinner, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { BaseProps } from '../../interfaces/baseProps';

interface FormData {
	email: string;
	password: string;
	username: string;
}

const DEFAULT_REGISTER_DATA: FormData = {
	email: '',
	password: '',
	username: '',
};

const RegisterPage: React.FC<any> = (props) => {
	const [loginData, setLoginData] = useState<FormData>(DEFAULT_REGISTER_DATA);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		axios.post('http://localhost:5000/user/register', loginData);
	};

	return (
		<div className='login-page  p-10'>
			<form className='flex flex-col gap-6' onSubmit={handleSubmit}>
				<FormControl isRequired>
					<FormLabel>Email</FormLabel>
					<Input
						placeholder='Type email'
						value={loginData.email}
						onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<Input
						placeholder='Type password'
						value={loginData.password}
						onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Username</FormLabel>
					<Input
						placeholder='Type username'
						value={loginData.username}
						onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
					/>
				</FormControl>
				<Button colorScheme='teal' size='md' type='submit'>
					Register
				</Button>
			</form>
		</div>
	);
};

export default RegisterPage;

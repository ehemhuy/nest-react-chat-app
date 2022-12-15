import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import './App.css';
import Input from './components/Input/Input';
import ConversationPage from './pages/ConversationPage/ConversationPage';

function App() {
	const socketClientRef = useRef<Socket>();
	const [inputVal, setInputVal] = useState<string>('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	useEffect(() => {
		fetch('http://localhost:5000/')
			.then((d) => d.json())
			.then(console.log);
		connect().then((s) => {
			socketClientRef.current = s;
			s.on('from-server', console.log);
		});
	}, []);

	function connect() {
		const url = 'http://localhost:5001/' ?? '';
		const socket = io(url);

		return new Promise<Socket>((resolve) => {
			socket.on('connect', () => {
				// socket.emit('room', 'room1');
				resolve(socket);
			});
		});
	}

	const handleSubmit = () => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			username: username,
			password: password,
			email: email,
		});

		var requestOptions: RequestInit = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
			credentials: 'include',
		};

		fetch('http://localhost:5000/user/register', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));
	};

	return (
		<div className='chat-app'>
			<BrowserRouter>
				<Routes>
					<Route element={<ConversationPage />} path='/conversation' />
				</Routes>
			</BrowserRouter>

			<Input
				onChange={(e) => {
					setUsername(e.target.value);
				}}
				value={username}
			/>
			<Input
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				value={email}
			/>
			<Input
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				value={password}
			/>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}

export default App;

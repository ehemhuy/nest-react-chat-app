import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import './App.css';
import Input from './components/Input/Input';
import ConversationPage from './pages/ConversationPage/ConversationPage';

function App() {
	const socketClientRef = useRef<Socket>();
	const [inputVal, setInputVal] = useState<string>('');
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

	return (
		<div className='chat-app'>
			<BrowserRouter>
				<Routes>
					<Route element={<ConversationPage />} path='/conversation' />
				</Routes>
			</BrowserRouter>

			<Input
				onChange={(e) => {
					setInputVal(e.target.value);
				}}
				value={inputVal}
			/>
		</div>
	);
}

export default App;

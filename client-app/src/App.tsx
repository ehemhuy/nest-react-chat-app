import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import './App.css';
import Input from './components/Input/Input';
import ConversationPage from './pages/ConversationPage/ConversationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
	const socketClientRef = useRef<Socket>();
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
				<Routes>
					<Route element={<LoginPage />} path='/login' />
				</Routes>
				<Routes>
					<Route element={<RegisterPage />} path='/register' />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

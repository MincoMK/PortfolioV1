import React from 'react';
import logo from './logo.svg';
import './App.css';
import Terminal from './components/Terminal';
import Screen from './components/Screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './views/Main'

function App() {
	return (
		<BrowserRouter>
			<Routes>
		 		<Route path="/" element={<Main />} /> 
			</Routes>
		</BrowserRouter>
	);
}

export default App;

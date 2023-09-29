import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navegate = useNavigate()

	// Obtiene el token almacenado en la sesión del navegador
	const token = sessionStorage.getItem('token');

	const handleClick = () => {
		actions.login(email, password)
			.then(success => {
				if (success) {
					navegate('/private');
				} else {
					alert("Login failed. Please check your email and password.");
				}
			});
	};


return (
	<div className="container">
		<h1 className="text-center">Log in</h1>
		{store.token && store.token !="" && store.token !== undefined ? (
			<p>You are logged in with this token: {store.token}</p>
		) : (
		<div>
			<div className="mb-3">
				<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
				<input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
			</div>

			<label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
			<input type="password" className="form-control" id="password" placeholder="Ab123!" value={password} onChange={e => setPassword(e.target.value)} />

			<div className="d-grid gap-2">
				<button type="button" className="btn btn-outline-dark mt-1" onClick={handleClick}>Log in</button>
			</div>
		</div>
		)}
	</div>
	);
};

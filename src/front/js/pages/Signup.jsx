import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navegate = useNavigate()

	const handleSignup = async () => {

		const requestOpts = {
			//1.1 Indicar que se espera una respuesta en formato JSON y que los datos enviados también estarán en formato JSON
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			})
		};

		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/register", requestOpts)

			if (response.status === 200) {
				alert('Registratio succesfull. You can now log in')
				navegate('/login')
				
			} else {
				alert('Registration failed. Plis try again')
			}

		} catch (error) {
			console.error("Error registering user:", error)
			alert("An error occurred. Please try again.")
		}

	};
const handleOnclick = (email, password) => {
	// Se llama a la funcion handleSignup y el método then()se utiliza para encadenar una acción que se ejecutará después de que la Promesa se resuelva con éxito.
	handleSignup(email, password)
		.then( () => {
			navegate('/login')
	})
}

return (
	<div className="container">
		<h1 className="text-center">Sign up</h1>

		<div className="mb-3">
			<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
			<input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
		</div>

		<label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
		<input type="password" className="form-control" id="password" placeholder="Ab123!" value={password} onChange={e => setPassword(e.target.value)} />

		<div className="d-grid gap-2">
			<button type="button" className="btn btn-outline-dark mt-1" onClick={() => handleOnclick(email, password)}>Signup</button>
		</div>
	</div>

);
};

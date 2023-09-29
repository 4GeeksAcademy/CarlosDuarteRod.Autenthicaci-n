import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context)

	return (
		<nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
		<div className="container-fluid">
			<a className="navbar-brand" href="#">JWT Auth Assessment</a>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarColor03">
			
				<Link to="/">
				<a className="nav-link active" href="#">Home</a>
				</Link>
				
			<form className="d-flex">
				<Link to="/signup">
				<a className="nav-link active" href="#">Sign up</a>
				</Link>	
				{/* Si el toquen no existe va a log in para ingresar */}
				{!store.token ? (
				<Link to="/login">
					<a className="nav-link active" href="#">Log in</a>
				</Link>
				):(
				<Link to="/login">
					<a className="nav-link active" href="#" onClick={() => actions.logout()}>Log out</a>
				</Link>			
				)}
			</form>
			</div>
		</div>
		</nav>
	);
};

import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className="App-nav-wrapper">
			<nav className="App-nav-link">
				<NavLink to="/"> Start </NavLink>
				<NavLink to="/battle"> Tävla </NavLink>
				<NavLink to="/gallery"> Galleri </NavLink>
				<NavLink to="/gallery"> Statistik </NavLink>
				<NavLink to="/gallery"> Historia </NavLink>
			</nav>
		</div>
	)
}

export default Navbar
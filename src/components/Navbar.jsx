import React from 'react'
import { NavLink, Route } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className="App-nav-wrapper">
			<nav className="App-nav-link">
				<Route>
					<NavLink to="/"> Start </NavLink>
					<NavLink to="/battle"> Tävla </NavLink>
					<NavLink to="/gallery"> Galleri </NavLink>
					<NavLink to="/stats"> Statistik </NavLink>
					<NavLink to="/history"> Historia </NavLink>
				</Route>
			</nav>
		</div>
	)
}

export default Navbar
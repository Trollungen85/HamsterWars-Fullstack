import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './views/home/Home'
import Battle from './views/battle/Battle'
import Gallery from './views/gallery/Gallery'
import HamsterProfile from './views/hamster/HamsterProfile'
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import History from './views/history/History'
import Stats from './views/stats/Stats'

function App() {
	return (
	<Router>
		<div className="App">
			<header>
				<div className="App-header">
					<Header />
				</div>
				<div className="App-nav-wrapper">
					<Navbar />
				</div>
			</header>


			<main className="App-main">
				<Switch>
					<Route path="/gallery" component={Gallery} />
                    <Route path="/HamsterProfile/:id" component={HamsterProfile} />
                    <Route path="/battle" component={Battle} />
					{/* <Route path="/history" component={History} /> */}
					<Route path="/stats" component={Stats} />
                    <Route exact path="/" component={Home} />
				</Switch>
			</main>

			<footer className="App-footer">
				<Footer />
			</footer>
		</div>
	</Router>
	);
}

export default App;
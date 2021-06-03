import logo from "../assets/Logga.svg"

const header = () => {
	return (
        <header className="component-header">
            <img className="Logga" src={logo}alt="logga" />
            <h1 className="Header-text"> HamsterWars - Let the game begin! </h1>
        </header>
	)
}

export default header
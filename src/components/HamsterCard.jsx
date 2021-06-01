const HamsterCard = (props) => {
	const name = props.name
	const imgName = props.imgName
	const age = props.age
	const favFood = props.favFood
	const loves = props.loves
	const wins = props.wins
	const defeats = props.defeats
	const games = props.games
	const urlImg = '/img/'

	return (
		<article>
			<h2>{name}</h2>
			<img src={urlImg + imgName} alt={name} />
			<p>{age}</p>
			<p>{favFood}</p>
			<p>{loves}</p>
			<p>{wins}</p>
			<p>{defeats}</p>
			<p>{games}</p>
		</article>
	)
}

export default HamsterCard
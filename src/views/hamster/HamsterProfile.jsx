import { useParams } from "react-router"
import { useHistory } from 'react-router-dom'
import useFetch from "../useFetch";
import "./hamsterProfile.css"

const HamsterProfile = () => {

	const { id } = useParams();
	const urlHamesteById = '/hamsters/' + id
	const { data: hamster, isLoaded, error } = useFetch(urlHamesteById)
	console.log(hamster.id)
	const history = useHistory()

	const goBack = () => {
		history.go(-1)
	}

	const deleteHamster = async (id) => {
        console.log('Delete hamster', id)

        if ((window.confirm("Vill du verkligen radera hamstern?"))) {
            console.log('throw the hamster away')

            try {
                await fetch('/hamsters/' + id, {
                    method: "DELETE"
                });
                history.push('/');
            } catch (error) {
                return error.message;
            }
        } else {
            console.log('No! Keep the hamster')
        }
    }

	return (
		<div className="hamsterProfile-wrapper">
			{ isLoaded ? <p>Loading...</p> : <>
				<h2>Hamster Information</h2>
				<button onClick={goBack}>Backa</button>
				{error && <div>{error}</div>}
				{hamster && (
					<article>
						<img src={`/img/${hamster.imgName}`} alt={hamster.name} />
						<h2>{`Namn: ${hamster.name}`}</h2>
						<p>{`Ålder: ${hamster.age}`}</p>
						<p>{`Favorit Mat: ${hamster.favFood}`}</p>
						<p>{`Älskar Att: ${hamster.loves}`}</p>
						<p>{`Vinster: ${hamster.wins}`}</p>
						<p>{`Förluster: ${hamster.defeats}`}</p>
						<p>{`Antal Spel: ${hamster.games}`}</p>

						<button onClick={() => deleteHamster(hamster.id)}>Radera Hamster</button>
					</article>
				)}

			</>}
		</div >
	)
}

export default HamsterProfile

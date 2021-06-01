// Vg del ( visa vilka hamstern har besegrat) 
// Felmeddelande 500, "Vänligen försök ladda om sidan" (inne i fetch) använd catch för att fånga upp


import { useParams } from "react-router"
import { useHistory } from 'react-router-dom'
import useFetch from "../useFetch";

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

        if ((window.confirm("Delete the item?"))) {
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
		<div>
			{ isLoaded ? <p>Loading...</p> : <>
				<h2>Hamster Data</h2>
				<button onClick={goBack}>Go Back</button>
				{error && <div>{error}</div>}
				{hamster && (
					<article>
						<img src={`/img/${hamster.imgName}`} alt={hamster.name} />
						<h2>{`Name: ${hamster.name}`}</h2>
						<p>{`Age: ${hamster.age}`}</p>
						<p>{`Favorit Food: ${hamster.favFood}`}</p>
						<p>{`Loves: ${hamster.loves}`}</p>
						<p>{`Wins: ${hamster.wins}`}</p>
						<p>{`Defeats: ${hamster.defeats}`}</p>
						<p>{`Games: ${hamster.games}`}</p>

						<button onClick={() => deleteHamster(hamster.id)}>Delete Hamster</button>
					</article>
				)}

			</>}
		</div >
	)
}

export default HamsterProfile

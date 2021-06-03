import './home.css';
import testBild from "../../assets/hamster-test-1.jpg"

const Home = () => {
const text = "Vilken hamster tycker Du är sötast? Klicka på TÄVLA här ovanför för att navigera dig till tävlingen. \nVäl där inne slumpas två hamstrar fram som du nu ska ta ställning till, Vem är sötast? Klicka på den bild du anser ska vinna tävlingen! \n \nOm du vill se alla våra fantastiska kandidater så kan du klicka på GALLERI. \nDär samlar vi alla våra söta pälsbollar så man kan få sig en riktig sötchock! Du kan också lägga till din aldeles egna hamster här om du vill de! \n \nSedan har vi STATISTIK där kan du se hur det har gått för våra tävlande. Vilken hamster har flest vinster respektive förluster? \n \nDen sista fliken heter HISTORIK, där kan man se hur de senaste matcherna har gått. In och kika!"

	return (
		<div>
			<div className="home-info-wrapper">
				<section >
					<div className="info">
						<h1>Välkommen till Hamsterwars appen!</h1>
						{text}
					</div>
				</section>
				<section className="home-img-random">
				<img className="testbild" src={testBild}alt="random hamster" />
				</section>
			</div>
		</div>
	)
}

export default Home

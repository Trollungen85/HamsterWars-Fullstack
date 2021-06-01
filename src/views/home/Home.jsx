import './home.css';
// G del !!! "Vänligen försök ladda om sidan" använd catch för att fånga upp felmeddelande 500

const Home = () => {
	return (
		<div>
			<section className="home-info-section">
				<h3 className="subheader"> Välkommen till Hamsterwars appen! </h3>
				<div>
				<p> Vilken hamster tycker Du är sötast? Klicka på TÄVLA här ovanför för att navigera dig till tävlingen. Väl där inne slumpas två hamstrar fram som du nu ska ta ställning till, Vem är sötast? Klicka på den bild du anser ska vinna tävlingen! </p>
				<p> Om du vill se alla våra fantastiska kandidater så kan du klicka på GALLERI. Där samlar vi alla våra söta pälsbollar så man kan få sig en riktig sötchock!
				Du kan också lägga till din aldeles egna hamster här om du vill de! </p>
				<p> Sedan har vi STATISTIK kan du se hur det har gått för våra tävlande. Vilken hamster har flest vinster respektive förluster? </p>
				<p> Den sista fliken heter HISTORIK, där kan man se hur de senaste matcherna har gått. In och kika! </p>
				</div>
			</section>,
			<section className="img-home-random">
				<div> IMG </div>
			</section>
		</div>
	)
}

export default Home

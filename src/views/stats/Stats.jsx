import './stats.css';
import useFetch from "../useFetch";

const Stats = () => {
    const { data: topFiveWinnwes } = useFetch('/winners')
    const { data: topFiveLosers } = useFetch('/losers')

    // console.log(topFiveWinnwes);
    // console.log(topFiveLosers);

    const renderWinnwes = topFiveWinnwes.map(hamster => (
        <li key={hamster.id} className="statsHamsters">
            <p style={{ fontWeight: "bold" }}>{`Name: ${hamster.name}`} </p>
            <p>{`Wins: ${hamster.wins}`} </p>
            <p>{`Games: ${hamster.games}`} </p>
        </li>
    ))
    const renderLosers = topFiveLosers.map(hamster => (
        <li key={hamster.id} className="statsHamsters">
            <p style={{ fontWeight: "bold" }}>{`Name: ${hamster.name}`} </p>
            <p>{`Defeats: ${hamster.defeats}`} </p>
            <p>{`Games: ${hamster.games}`} </p>
        </li>
    ))
	return (
        <div className="main-container">
            <h1>Stats</h1>
            <article className="flex-content">
                <section className="st">
                    <h2>Top 5 hamsters</h2>
                    <ol>
                        {renderWinnwes}
                    </ol>
                </section>

                <section className="st">
                    <h2>Bottom 5 hamsters</h2>
                    <ol>
                        {renderLosers}

                    </ol>
                </section>
            </article>
        </div>
    )
}

export default Stats;
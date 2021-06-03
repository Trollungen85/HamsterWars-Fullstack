import './stats.css';
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Stats = () => {
    const { data: topFiveWinnwes, isLoaded: isLoadedWin, error: errorWin } = useFetch('/winners')
    const { data: topFiveLosers, isLoaded: isLoadedLose, error: errorLose } = useFetch('/losers')

    // console.log(topFiveWinnwes);
    // console.log(topFiveLosers);

    const renderWinnwes = topFiveWinnwes.map(hamster => (
        <li key={hamster.id} className="statsHamsters">
            <Link to={`/HamsterProfile/${hamster.id}`} className="list-card-link">
                <p style={{ fontWeight: "bold" }}>{`Namn: ${hamster.name}`} </p>
            </Link>
            <p>{`Vinster: ${hamster.wins}`} </p>
            <p>{`Antal Spel: ${hamster.games}`} </p>
        </li>
    ))
    const renderLosers = topFiveLosers.map(hamster => (
        <li key={hamster.id} className="statsHamsters">
            <Link to={`/HamsterProfile/${hamster.id}`} className="list-card-link">
                <p style={{ fontWeight: "bold" }}>{`Namn: ${hamster.name}`} </p>
            </Link>
            <p>{`Förluster: ${hamster.defeats}`} </p>
            <p>{`Antal Spel: ${hamster.games}`} </p>
        </li>
    ))
    return (
        <div className="main-container">
            <h1>Staistik</h1>

            <article className="flex-content">
                {isLoadedWin ? <p>Laddar...</p> : <>
                    <section className="stats-list">
                        <h2>Top 5 hamstrar</h2>
                        {errorWin &&
                            <div className="error-message">
                                <p>{errorWin}</p>
                                <button onClick={() => window.location.reload(false)}>Ladda om sidan</button>
                            </div>
                        }
                        <ol>
                            {renderWinnwes}
                        </ol>
                    </section>
                </>}

                {isLoadedLose ? <p></p> : <>
                    <section className="stats-list">
                        <h2>Lägsta 5 hamstrarna</h2>
                        {errorLose &&
                            <div className="error-message">
                                <p>{errorLose}</p>
                                <button onClick={() => window.location.reload(false)}>Ladda om sidan</button>
                            </div>
                        }
                        <ol>
                            {renderLosers}
                        </ol>
                    </section>
                </>}
            </article>
        </div>
    )
}

export default Stats;
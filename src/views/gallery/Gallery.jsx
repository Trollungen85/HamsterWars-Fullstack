import useFetch from "../useFetch";
import React, { useState } from 'react';
import HamsterCard from "../../components/HamsterCard";
import { Link } from "react-router-dom"
import ModalForms from "../modalViews/ModalForms";
import './gallery.css';

const Gallery = () => {
	const hamsterPerPage = 50
    const [currentPage] = useState(0);
    // const [stopData, setStopData] = useState(3);
    const [isShowing, setIsShowing] = useState(false)
	const { data: hamsters, isLoaded, error } = useFetch('/hamsters')
	console.log(hamsters)

    function toggle() {
        setIsShowing(!isShowing);
    }

	// PAINATION
    const displayPage = hamsters.slice(currentPage, currentPage + hamsterPerPage)

    //funktionen för att byta sida om fler än 50 hamstrar laddats upp, knappar längre ner.
	// function nextPage() {
    //     if (currentPage < hamsters.length - 1) {
    //         setStopData(stopData + 1)
    //         setCurrentPage(currentPage => currentPage + hamsterPerPage)
    //     }
    // }

    // const prevPage = () => {
    //     if (currentPage > 1) {
    //         console.log('prevPage right');
    //         setCurrentPage(currentPage => currentPage - hamsterPerPage)
    //     }
    // }

	const renderHamsters = displayPage.map(hamsters => (
        <li key={hamsters.id}>
            <Link to={`/HamsterProfile/${hamsters.id}`}>
                <HamsterCard 
                    imgName={hamsters.imgName}
                    name={`${hamsters.name}`}
                />
            </Link>
        </li>
    ))

	return (
		<div className="content">
			<h1>Alla Hamstrar</h1>
			<button className="button-default" onClick={toggle}>Ladda upp ny Hamster</button>
            <ModalForms
                isShowing={isShowing}
                hide={toggle}
            />

            { isLoaded ? <p>Laddar...</p> : <>
                <article className="gallery-grid">
                    {error && <div>{error}</div>}
                    <ul>{renderHamsters}</ul>
                </article>

                {/* knappar för att byta sida om fler än 50 hamstrar laddats upp
                <button onClick={prevPage}>Föregående</button>
                <button onClick={nextPage}>Nästa</button> */}
            </>}
		</div>
	)
}

export default Gallery;
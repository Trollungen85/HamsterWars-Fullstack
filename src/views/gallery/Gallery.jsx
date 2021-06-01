// Vg del ( visa vilka hamstern har besegrat) -ska ligga i hamsterProfile.

import useFetch from "../useFetch";
import React, { useState } from 'react';
import HamsterCard from "../../components/HamsterCard";
import { Link } from "react-router-dom"
import ModalForms from "../modalViews/ModalForms";
import './gallery.css';

const Gallery = () => {
	const hamsterPerPage = 3
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState(3);
    const [isShowing, setIsShowing] = useState(false)
	const { data: hamsters, isLoaded, error } = useFetch('/hamsters')
	console.log(hamsters)

    function toggle() {
        setIsShowing(!isShowing);
    }

	// PAINATION
    const displayPage = hamsters.slice(currentPage, currentPage + hamsterPerPage)

	function nextPage() {
        if (currentPage < hamsters.length - 1) {
            setData(data + 1)
            setCurrentPage(currentPage => currentPage + hamsterPerPage)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            console.log('prevPage right');
            setCurrentPage(currentPage => currentPage - hamsterPerPage)
        }
    }

	const renderHamsters = displayPage.map(hamsters => (
        <li key={hamsters.id}>
            <Link to={`/HamsterProfile/${hamsters.id}`}>
                <HamsterCard 
                    imgName={hamsters.imgName}
                    name={`Name: ${hamsters.name}`}
                />
            </Link>
        </li>
    ))

	return (
		<div className="content">
			<h1>All hamsters</h1>
			<button className="button-default" onClick={toggle}>Add new Hamster</button>
            <ModalForms
                isShowing={isShowing}
                hide={toggle}
            />

            { isLoaded ? <p>Loading...</p> : <>
                <article className="gallery-grid">
                    {error && <div>{error}</div>}
                    <ul>{renderHamsters}</ul>
                </article>
                <button onClick={prevPage}>Prev</button>
                <button onClick={nextPage}>Next</button>
            </>}
		</div>
	)
}

export default Gallery;
import React from 'react';
import ReactDOM from 'react-dom';
import HamsterCard from "../../components/HamsterCard";
import { Link } from "react-router-dom"
import "./modal.css"
//https://upmostly.com/tutorials/modal-components-react-custom-hooks


const ModalWinner = ({ isShowing, hide, hamsterWins, hamsterLoser }) => isShowing ? ReactDOM.createPortal(
	<React.Fragment>
		<div className="modal-overlay" />
		<div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				<div className="modal-header"> 
				</div>
				<div className="modal">
					<h2>{hamsterWins.name} vann över {hamsterLoser.name}</h2>
					<div className="modal-hamster-cards">
						<div className="winner-article">
							<HamsterCard
								imgName={hamsterWins.imgName}
							/>
							<p>{hamsterWins.name} har:</p>
							<p>{hamsterWins.wins + 1} vinster</p>
							<p>{hamsterWins.defeats} förluster</p>
							<p>antal tävlingar gjorda: {hamsterWins.games + 1}</p>

							<Link to={`/HamsterProfile/${hamsterWins.id}`}>
							Kika närmare på {hamsterWins.name}
							</Link>
						</div>
						<div className="loser-article">
							<HamsterCard
								imgName={hamsterLoser.imgName}
							/>

							<p>{hamsterLoser.name} har:</p>
							<p>{hamsterLoser.wins} vinster</p>
							<p>{hamsterLoser.defeats + 1} förluster</p>
							<p>antal tävlingar gjorda: {hamsterLoser.games + 1}</p>

							<Link to={`/HamsterProfile/${hamsterLoser.id}`}>
								Kika närmare på {hamsterLoser.name}
							</Link>
						</div>
					</div>
				</div>
						<button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
							Spela igen!
						</button>
			</div>
		</div>
	</React.Fragment>, document.body
) : null;

export default ModalWinner;
// REVIEW and do better

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
					<button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal">
					<h2>{hamsterWins.name} killed {hamsterLoser.name} with cutness!</h2>
					<p>{hamsterWins.name} has won {hamsterWins.wins + 1} out of {hamsterWins.games + 1} games and lost {hamsterWins.defeats}.</p>
					<p>{hamsterWins.id}</p>
					<div className="modal-hamster-cards">
						<div className="winner-article">
							<HamsterCard
								imgName={hamsterWins.imgName}
							/>
							<Link to={`/HamsterProfile/${hamsterWins.id}`}>
								Visit {hamsterWins.name}
							</Link>
						</div>
						<div className="loser-article">
							<HamsterCard
								imgName={hamsterLoser.imgName}
							/>
							<p>{hamsterLoser.name} has:</p>
							<p>lost {hamsterLoser.defeats + 1},</p>
							<p>won {hamsterLoser.wins},</p>
							<p>a total of {hamsterLoser.games + 1} games</p>
							<Link to={`/HamsterProfile/${hamsterLoser.id}`}>
								Visit {hamsterLoser.name}
							</Link>
						</div>
						<button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
							Play again!
						</button>
					</div>
				</div>
			</div>
		</div>
	</React.Fragment>, document.body
) : null;

export default ModalWinner;
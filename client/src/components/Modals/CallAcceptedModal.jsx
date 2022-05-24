import React from 'react';
import './modal.scss';

import {Link} from 'react-router-dom';


const CallAcceptedModal = ({ userJoinedCall, id, hostId, closeCallAcceptedModal, showCallAcceptedModal, link }) => {
  return (
    <div className={userJoinedCall && id == hostId && showCallAcceptedModal ? "modal is-active" : "modal"}>
      <div className="modal-background" 
        onClick={closeCallAcceptedModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title loading-text">
            User has joined the room<br />
          </p>
          <button className="delete" aria-label="close"
            onClick={closeCallAcceptedModal}></button>
        </header>
        <section className="modal-card-body has-text-centered">
          <Link className="button is-primary is-outlined" to={link}>Enter room</Link>
        </section>
        <footer className="modal-card-foot">

        </footer>
      </div>
    </div>
  )
}

export default CallAcceptedModal;
import React, {useEffect} from 'react';
import './modal.scss';

import {Link} from 'react-router-dom';


const ReceivingCallModal = ({ currentCalling, id, closeReceivingCallModal, showReceivingCallModal, userJoinedCallHandler, link }) => {

  
  return (
    <div className={currentCalling === id && showReceivingCallModal ? "modal is-active" : "modal"}>
      <div className="modal-background" 
        onClick={closeReceivingCallModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title loading-text">
            Receiving call from host<br />
          </p>
          <button className="delete" aria-label="close"
            onClick={closeReceivingCallModal}></button>
        </header>
        <section className="modal-card-body has-text-centered">
          <Link className="button is-primary" onClick={userJoinedCallHandler} to={link}>Answer</Link>
        </section>
        <footer className="modal-card-foot">
        </footer>
      </div>
    </div>
  )
}

export default ReceivingCallModal;
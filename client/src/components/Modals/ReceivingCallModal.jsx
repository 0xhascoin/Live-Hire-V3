import React from 'react';
import './modal.scss';

import {Link} from 'react-router-dom';

const ReceivingCallModal = ({ currentCalling, id, closeReceivingCallModal, showReceivingCallModal, userJoinedCallHandler, link }) => {
  return (
    <div class={currentCalling === id && showReceivingCallModal ? "modal is-active" : "modal"}>
      <div class="modal-background" 
        onClick={closeReceivingCallModal}></div>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title loading-text">
            Receiving call from host<br />
          </p>
          <button class="delete" aria-label="close"
            onClick={closeReceivingCallModal}></button>
        </header>
        <section class="modal-card-body has-text-centered">
          <Link className="button is-primary" onClick={userJoinedCallHandler} to={link}>Answer</Link>
        </section>
        <footer class="modal-card-foot">

        </footer>
      </div>
    </div>
  )
}

export default ReceivingCallModal;
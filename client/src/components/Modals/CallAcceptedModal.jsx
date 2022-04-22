import React from 'react';
import './modal.scss';

const CallAcceptedModal = ({ userJoinedCall, id, hostId, closeCallAcceptedModal, showCallAcceptedModal }) => {
  return (
    <div class={userJoinedCall && id == hostId && showCallAcceptedModal ? "modal is-active" : "modal"}>
      <div class="modal-background" 
        onClick={closeCallAcceptedModal}></div>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title loading-text">
            User has joined the room<br />
          </p>
          <button class="delete" aria-label="close"
            onClick={closeCallAcceptedModal}></button>
        </header>
        <section class="modal-card-body has-text-centered">
          <button className="button is-primary is-outlined">Enter room</button>
        </section>
        <footer class="modal-card-foot">

        </footer>
      </div>
    </div>
  )
}

export default CallAcceptedModal;
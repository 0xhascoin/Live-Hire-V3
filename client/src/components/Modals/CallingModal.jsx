import React from 'react';
import './modal.scss';

const CallingModal = ({ showModal, closeCallingModal, name }) => {
  return (
    <div class={showModal ? "modal is-active" : "modal"}>
      <div class="modal-background" 
        onClick={closeCallingModal}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"></p>
          <button class="delete" aria-label="close"
            onClick={closeCallingModal}></button>
        </header>
        <section class="modal-card-body has-text-centered">
          <div className="loading-text">
            Calling {name}<br/>
          </div>
        </section>
        <footer class="modal-card-foot">

        </footer>
      </div>
    </div>
  )
}


export default CallingModal;
import React from 'react';
import './modal.scss';

const CallingModal = ({ showModal, closeCallingModal, name }) => {
  return (
    <div className={showModal ? "modal is-active" : "modal"}>
      <div className="modal-background" 
        onClick={closeCallingModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
          <button className="delete" aria-label="close"
            onClick={closeCallingModal}></button>
        </header>
        <section className="modal-card-body has-text-centered">
          <div className="loading-text">
            Calling {name}<br/>
          </div>
        </section>
        <footer className="modal-card-foot">

        </footer>
      </div>
    </div>
  )
}


export default CallingModal;
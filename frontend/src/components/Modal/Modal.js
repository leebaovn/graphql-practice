import React from 'react'
import Button from '../Button';
import './modal.css'

const Modal = (props) => (
  <>
    <div className='backdrop' onClick={props.onCancel}></div>
    <div className="modal">
      <header className="modal__header"><h1>{props.title}</h1></header>
      <section className="modal__content">
        {props.children}
      </section>
      <section className="modal__actions">
        {props.canCancel && <Button onClick={props.onCancel}>Cancel</Button>}
        {props.canConfirm && <Button onClick={props.onConfirm}>{props.confirmText}</Button>}
      </section>
    </div>
  </>
)

export default Modal;
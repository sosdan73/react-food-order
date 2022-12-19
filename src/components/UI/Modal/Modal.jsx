import classes from './Modal.module.css'
import React from 'react';
import ReactDOM from "react-dom";

const Backdrop = ({onClose}) => {
    return <div className={classes.backdrop} onClick={onClose}/>
};

const ModalOverlay = ({children}) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
};

const portalElement = document.getElementById('overlays');

const Modal = ({children, onClose}) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={onClose}/>, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                portalElement
            )}
        </>
    )
}

export default Modal
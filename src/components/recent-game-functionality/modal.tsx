import React from 'react';
import Backdrop from "././backdrop";

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    children: React.ReactNode;
    modalClass:string
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, children ,modalClass}) => {
    if (!isOpen) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks

    return (
        <Backdrop onClick={handleClose}>
            <div className="modal-backdrop" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={"modal-close-button modal-close-button-" + modalClass } onClick={handleClose}> X </button>
            </div>
        </Backdrop>
    );
};

export default Modal
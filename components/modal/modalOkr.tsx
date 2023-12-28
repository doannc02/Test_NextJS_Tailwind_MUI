import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

const Modal = (props: { onClose: Function, children: ReactNode, title: string }) => {
    const handleCloseClick = (e: Event) => {
        e.preventDefault();
        props.onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={() => props.onClose()}>
                            x
                        </a>
                    </div>
                    {props.title && <h1>{props.title}</h1>}
                    <div className="modal-body">{props.children}</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root") as Element | DocumentFragment
    );
};

export default Modal
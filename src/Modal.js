import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";

import MainContext from "./context";

const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
    backdropFilter: "blur(3px)",
};

const X_STYLES = {
    color: "red",
    cursor: "pointer",
    display: "flex",
    fontSize: "2rem",
};

export default function Modal(props) {
    const { children, open, close, ...restProps } = props;
    const context = useContext(MainContext);

    const MODAL_STYLES = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: context.theme.background,
        color: context.theme.text,
        padding: "50px",
        zIndex: 1000,
        minWidth: "400px",
    };

    return ReactDOM.createPortal(
        <>
            {open && (
                <>
                    <div style={OVERLAY_STYLES} />
                    <div {...restProps} className="modal" style={MODAL_STYLES}>
                        <MdClose style={X_STYLES} onClick={close} />
                        <div>{children}</div>
                    </div>
                </>
            )}
        </>,
        document.getElementById("portal")
    );
}

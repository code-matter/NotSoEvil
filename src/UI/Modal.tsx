import React from "react";
import ReactDOM from "react-dom";
import { RANDOM_COLORS } from "../pages/HomePage";
import { motion } from "framer-motion"

const Backdrop = (props: any) => {
  return <div className="modal-backdrop" onClick={props.onClose}></div>;
};

const ModalOverlay = (props: any) => {
  return (
    <motion.div className="modal"
      initial={{ y: '100vh', x: '-50%' }}
      animate={{ y: '-50%' }}
      transition={{
        type: "spring",
        damping: 50,
        mass: 3,
        stiffness: 500,
      }}
    >
      <div className="modal-content">{props.children}</div>
    </motion.div>
  );
};

const portalEl = document.getElementById("overlays");

const Modal = (props: any) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalEl as HTMLElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEl as HTMLElement
      )}
    </>
  );
};

export default Modal;
import ReactDOM from "react-dom";
import { motion } from "framer-motion"

const Backdrop = (props: any) => {
  return <div className="modal-backdrop" onClick={props.onClose}>{props.children}</div>;
};

const ModalOverlay = (props: any) => {
  return (
    <motion.div className="modal"
      initial={{ y: 250, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 50,
        mass: 3,
        stiffness: 500,
      }}
      style={{ backgroundColor: props.backdropColor }}
    >
      <div className="modal-content">{props.children}</div>
    </motion.div>
  );
};

const portalEl = document.getElementById("overlays");

const Modal = (props: any) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={props.onClose ?
            props.onClose :
            null} >
          <ModalOverlay backdropColor={props.backdropColor}>{props.children}</ModalOverlay>
        </Backdrop>, portalEl as HTMLElement)}
    </>
  );
};

export default Modal;
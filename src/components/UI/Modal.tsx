import ReactDOM from "react-dom";
import { motion } from "framer-motion"
import { HiX } from "react-icons/hi";

const Backdrop = (props: any) => {
  return <div className="modal-backdrop" id="backdrop" onClick={(event: any) => {
    if (event.target.id === "backdrop")
      props.onClose()
  }} {...props}>{props.children}</div>;
};

const ModalOverlay = (props: any) => {
  console.log(props.onClick)
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
      style={{ backgroundColor: props.backdropColor, marginBottom: navigator.userAgent.includes('iPhone') ? '10%' : 0 }}
    >
      <div className="modal-content">
        <HiX className="purple" size={24} onClick={props.onClose} />
        {props.children}
      </div>
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
          <ModalOverlay backdropColor={props.backdropColor} onClose={props.onClose ?
            props.onClose :
            null}>{props.children}</ModalOverlay>
        </Backdrop>, portalEl as HTMLElement)}
    </>
  );
};

export default Modal;
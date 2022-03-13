import ReactDOM from "react-dom";
import { motion } from "framer-motion"

const Backdrop = (props: any) => {
  return <motion.div className="feedback-backdrop"
    onClick={props.onClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "spring",
      damping: 50,
      mass: 3,
      stiffness: 500,
    }}
    exit={{ opacity: 0 }}
  >{props.children}</motion.div>;
};

const FeedbackOverlay = (props: any) => {
  return (
    <motion.div className="feedback"
      initial={{ y: '-25vh', opacity: 0 }}
      animate={{ y: 100, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 50,
        mass: 3,
        stiffness: 500,
      }}
      exit={{ y: '-25vh', opacity: 0 }}
    >
      <div className="feedback-content">{props.children}</div>
    </motion.div>
  );
};

const portalEl = document.getElementById("overlays");

const Feedback = (props: any) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={props.backdropClose ?
            props.onClose :
            null} >
          <FeedbackOverlay>{props.children}</FeedbackOverlay>
        </Backdrop>, portalEl as HTMLElement)}
    </>
  );
};

export default Feedback;
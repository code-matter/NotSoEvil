import ReactDOM from "react-dom";
import { motion } from "framer-motion"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Backdrop = (props: any) => {
  return <motion.div className="cartAside-backdrop"
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

const CartAsideOverlay = (props: any) => {
  return (
    <motion.div className="cartAside"
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
      <div className="cartAside-content">{props.children}</div>
    </motion.div>
  );
};

const portalEl = document.getElementById("overlays");

const CartAside = (props: any) => {
  const userContext = useContext(UserContext);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={props.backdropClose ?
            props.onClose :
            null} >
          {props.shopItems && userContext && <CartAsideOverlay>
            {userContext.state.items.map((i: any, idx: number) =>
              <p>{i.id}</p>
            )}
          </CartAsideOverlay>}
        </Backdrop>, portalEl as HTMLElement)}
    </>
  );
};

export default CartAside;
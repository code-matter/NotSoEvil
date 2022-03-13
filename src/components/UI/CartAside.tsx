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
      initial={{ y: 100, x: '20vw', opacity: 0 }}
      animate={{ y: 100, x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 50,
        mass: 3,
        stiffness: 500,
      }}
      exit={{ x: '50vw' }}
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
        <>
          <Backdrop
            onClose={props.onClose ?
              props.onClose :
              null} >

          </Backdrop>
          {props.shopItems && userContext && <CartAsideOverlay>
            {userContext.state.items.map((i: any, idx: number) =>
              <div className="cart-item-view" key={i.id + idx}>
                <img src={i.image} alt={i.image} />
                <div className="cart-item-infos">
                  <div className="infos-title">
                    <h1>{i.id}</h1>
                    <h1>{i.price} $</h1>
                  </div>
                  <div className="infos-title description">
                    <p>{i.rarity.toUpperCase()}</p>
                    <p>{i.type}</p>
                    <p>{i.size}</p>
                  </div>
                </div>
              </div>
            )}
          </CartAsideOverlay>}
        </>
        , portalEl as HTMLElement)}
    </>
  );
};

export default CartAside;
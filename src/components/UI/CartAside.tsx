import ReactDOM from "react-dom";
import { motion } from "framer-motion"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { PayPalButtons } from "@paypal/react-paypal-js";

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
          {props.shopItems && userContext &&
            <CartAsideOverlay>
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
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order
                    .create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: 'CAD',
                            value: userContext.state.items.reduce((prev: any, next: any) => { return prev + Number(next.price) }, 0).toString(),
                          },
                        },
                      ],
                    })
                    .then((orderId) => {
                      // Your code here after create the order. Good place to redirect to a order summary page
                      console.log('orderId', orderId)
                      return orderId;
                    });
                }}
                onCancel={() => console.log('sss')}
                onApprove={(data, actions) => {
                  // This function captures the funds from the transaction.
                  console.log('data: ', data)
                  console.log('actions: ', actions)
                  if (actions.order)
                    return actions.order?.capture().then(function (details) {
                      // This function shows a transaction success message to your buyer.

                      alert('Transaction completed by ' + details.payer.name.given_name);
                    })
                  else
                    return new Promise(() => null)

                }} />
            </CartAsideOverlay>}
        </>
        , portalEl as HTMLElement)}
    </>
  );
};

export default CartAside;
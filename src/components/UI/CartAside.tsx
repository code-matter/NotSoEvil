import ReactDOM from "react-dom";
import { motion } from "framer-motion"
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { BiTrash } from "react-icons/bi";
import { USER_KEYS } from "../../constants/reducerKeys";
import useMobile from "../../hooks/useMobile";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ShopService } from "../../services/shop.services";
import { OrdersService } from "../../services/orders.services";

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
  const { isMobile } = useMobile()
  const cartAside = {
    mobileBefore: {
      y: 0,
      x: '20vw',
      opacity: 0
    },
    mobileAfter: {
      y: 0,
      x: 0,
      opacity: 1
    },
  }

  return (
    <motion.div className="cartAside"
      initial={"mobileBefore"}
      animate={"mobileAfter"}
      variants={cartAside}
      transition={{
        type: "spring",
        damping: 50,
        mass: 3,
        stiffness: 500,
      }}
      exit={isMobile ? { x: '100vw' } : { x: '50vw' }}
    >
      <div className="cartAside-content">{props.children}</div>
    </motion.div>
  );
};

const portalEl = document.getElementById("overlays");

const CartAside = (props: any) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate()

  const onApproveHandler = (data: any, actions: any) => {
    // This function captures the funds from the transaction.
    if (actions.order)
      return actions.order?.capture().then(async function (details: any) {
        try {
          await userContext.state.items.forEach(async (item: any) => {
            await ShopService.update(item.id, { available: false })
          })
          await OrdersService.create({ details: details, items: userContext.state.items })
          userContext.dispatch({ type: USER_KEYS.RESET_CART })
          // Want to get rid of state and store to FB instead
          navigate(`/order/${details.id}`)
        } catch (error) {
          console.error(error)
        }
        // if details.status === "COMPLETED" => save info in user DB
        // Redirects to 'Complete Order Page' showing the info 
        // Send confirmation email
      })
    else
      return new Promise(() => null)

  }

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Backdrop
            onClose={props.onClose ?
              props.onClose :
              null} >

          </Backdrop>
          {props.shopItems && userContext.state.items.length &&
            <CartAsideOverlay>
              <span>
                <HiX className="exit"
                  size={24}
                  onClick={() => userContext.dispatch(
                    { type: USER_KEYS.TOGGLE_CART }
                  )} />
                {userContext.state.items.map((i: any, idx: number) =>
                  <div className="cart-item-view" key={i.id + idx}>
                    <img src={i.image} alt={i.image} />
                    <div className="cart-item-infos">
                      <div className="infos-title">
                        <h1>{i.name}</h1>
                        <h1>{i.price} $</h1>
                      </div>
                      <div className="infos-title description">
                        <p>{i.rarity.toUpperCase()}</p>
                        <p>{i.type}</p>
                        <p>{i.size}</p>
                        <BiTrash onClick={() => {
                          userContext.dispatch(
                            { type: USER_KEYS.REMOVE_ITEMS, payload: i.id }
                          )
                        }} />
                      </div>
                    </div>
                  </div>
                )}
              </span>
              <div className="cartAside-total">
                <div className="cart-item-view">
                  <div className="cart-item-infos">
                    <div className="infos-title">
                      <h1>Details</h1>
                    </div>
                    <div className="infos-title description">
                      <p>Subtotal</p>
                      <p>{userContext.state.items.reduce(
                        (prev: any, next: any) =>
                          prev + Number(next.price), 0).toFixed(2)} $
                      </p>
                    </div>
                    <div className="infos-title description">
                      <p>Taxes</p>
                      <p>{(userContext.state.items.reduce(
                        (prev: any, next: any) =>
                          prev + Number(next.price), 0) * 0.15)
                        .toFixed(2)} $
                      </p>
                    </div>
                    <div className="infos-title description">
                      <p>Shipping</p>
                      <p>{(5)
                        .toFixed(2)} $
                      </p>
                    </div>
                    <div className="infos-title description">
                      <p>Total</p>
                      <p>{(5 + userContext.state.items.reduce(
                        (prev: any, next: any) =>
                          prev + Number(next.price), 0) * 1.15)
                        .toFixed(2)} $
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <PayPalButtons
                forceReRender={[userContext.state.items]}
                createOrder={async (data, actions) => {
                  return actions.order
                    .create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: 'CAD',
                            value: (5 + userContext.state.items.reduce(
                              (prev: any, next: any) =>
                                prev + Number(next.price), 0) * 1.15)
                              .toFixed(2)
                              .toString(),
                          },
                        },
                      ],
                    })
                    .then((orderId) => {
                      // Your code here after create the order. Good place to redirect to a order summary page
                      return orderId;
                    });
                }}
                onCancel={() => {
                  // Nothing?
                }}
                onApprove={onApproveHandler} />
            </CartAsideOverlay>}
        </>
        , portalEl as HTMLElement)}
    </>
  );
};

export default CartAside;
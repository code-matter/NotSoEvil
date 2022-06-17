import { useContext, useEffect, useRef, useState } from 'react'
import ShopItem from '../components/ShopItem'
import { useNavigate } from 'react-router-dom';
import SquareButton from '../components/UI/SquareButton';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import CartAside from '../components/UI/CartAside';
import { UserContext } from '../context/UserContext';
import { AnimatePresence } from 'framer-motion';
import { USER_KEYS } from '../constants/reducerKeys';
import { FlashService } from '../services/flash.services';
import { scrollInView } from './Shop';

export interface IFlash {
}

const PRICE = 50

/*THIS WILL NEED A MAJOR REFACTOR. IM JUST PLAYING AROUND NOW */

const Flash = ({ }: IFlash) => {

  const [shopItems, setShopItems] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { t } = useTranslation()
  const OEUVRES = useRef<HTMLElement>(null)

  const userContext = useContext(UserContext)

  const fetchData = async () => {
    const flashes: any = await FlashService.list();
    if (flashes.empty) {
      console.error('No items!')
    }
    const docs = await flashes.docs
    setShopItems(docs)
    setIsLoading(false)
  }

  useEffect((): any => {
    fetchData()
    return () => {
      setShopItems([])
      setIsLoading(true)
    }
  }, [])


  return (
    <>
      {/* <ShopFilter /> */}
      <AnimatePresence>
        {userContext.state.cartOpen &&
          <CartAside shopItems={shopItems} onClose={() => userContext.dispatch({ type: USER_KEYS.TOGGLE_CART })} />}
      </AnimatePresence>

      {!isLoading &&
        <div className="shop-container container">
          <div className="shop-ctas">
            <SquareButton
              label={t("shop.original_art")}
              onClick={() => scrollInView(OEUVRES)} />
          </div>
          <section className="shop-section oeuvres"
            ref={OEUVRES}>
            <h2>{t("shop.original_art")}</h2>
            <hr />
            <div className="shop-items-container">
              {shopItems?.filter((si: any) =>
                si.data().category === 1).length ?
                shopItems?.filter((si: any) =>
                  si.data().category === 1)
                  .map((item: any, idx: number) => {
                    return (
                      <ShopItem
                        key={idx}
                        id={item.data().id}
                        name={item.data().name}
                        description={item.data().description}
                        image={item.data().image}
                        size={item.data().size}
                        type={item.data().type}
                        available={item.data().available}
                        rarity={item.data().rarity}
                        price={PRICE} />
                    )
                  }) : <p>{t('shop.no_items')}</p>}
            </div>
          </section>
        </div>
      }
    </>
  )
}

export default Flash
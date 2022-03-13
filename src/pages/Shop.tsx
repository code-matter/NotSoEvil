import { useContext, useEffect, useRef, useState } from 'react'
import ShopItem from '../components/ShopItem'
import { useNavigate } from 'react-router-dom';
import { FlashesService } from '../services/flashes.services';
import SquareButton from '../components/UI/SquareButton';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { ITEM_CATEGORIES } from '../utils/constants';
import CartAside from '../components/UI/CartAside';
import { UserContext } from '../context/UserContext';
import { AnimatePresence } from 'framer-motion';
import { USER_KEYS } from '../constants/reducerKeys';

export interface IShop {
}

export const scrollInView = (where: any) => {
  if (where) {
    where.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

/*THIS WILL NEED A MAJOR REFACTOR. IM JUST PLAYING AROUND NOW */

const Shop = ({ }: IShop) => {
  const [shopItems, setShopItems] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpened, setFiltersOpened] = useState(false)
  const [currentFilters, setCurrentFilters] = useState<any>({
    color: [],
    minPrice: 0,
    maxPrice: undefined,
    rarity: [],
    size: [],
    type: []
  })
  const { t } = useTranslation()
  const OEUVRES = useRef<HTMLElement>(null)
  const PRINTS = useRef<HTMLElement>(null)
  const MERCH = useRef<HTMLElement>(null)
  const userContext = useContext(UserContext)

  const fetchData = async () => {
    const flashes: any = await FlashesService.list('shop-items');
    if (flashes.empty) {
      console.error('No items!')
      return
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

  const handleFilters = (e: any) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? e.target.checked : target.value;
    const type = target.type;
    const name = target.name;
    const id = target.id;
    let tmpFilters;
    switch (type) {
      case 'checkbox':
        tmpFilters = { ...currentFilters };
        if (tmpFilters[name].includes(id)) {
          const tmpIdx = tmpFilters[name].indexOf(id)
          tmpFilters[name].splice(tmpIdx, 1)
        } else {
          tmpFilters[name].push(id)
        }
        setCurrentFilters(tmpFilters)
        break;

      default:
        break;
    }
  }

  const isFiltering =
    currentFilters.color.length !== 0 ||
    currentFilters.rarity.length !== 0 ||
    currentFilters.type.length !== 0 ||
    currentFilters.size.length !== 0 ||
    currentFilters.minPrice > 0 ||
    currentFilters.maxPrice > 0

  useEffect(() => {
    const tmpShopItems = { ...shopItems }
    if (isFiltering && tmpShopItems) {
      const filters = { ...currentFilters }
      console.log('filters: ', filters)
      // console.log('shopItems: ', shopItems)
      _.forEach(tmpShopItems, (iValue: any, iKey: string) => {
        console.log(iValue)
      })
    }
  }, [currentFilters, shopItems, isFiltering])


  return (
    <>
      {/* <ShopFilter /> */}
      <AnimatePresence>
        {userContext.state.cartOpen &&
          <CartAside shopItems={shopItems} onClose={() => userContext.dispatch({ type: USER_KEYS.TOGGLE_CART })} />}
      </AnimatePresence>
      {!isLoading && shopItems.length > 0 &&
        <div className="shop-container container">
          <div className="shop-ctas">
            <SquareButton
              fontSize={22}
              label={t("shop.original_art")}
              onClick={() => scrollInView(OEUVRES)} />
            <SquareButton
              fontSize={22}
              label={t("shop.prints")}
              onClick={() => scrollInView(PRINTS)} />
            <SquareButton
              fontSize={22}
              label={t("shop.merch")}
              onClick={() => scrollInView(MERCH)} />
          </div>
          {/* <div className="shop-filters">
            <p onClick={() => setFiltersOpened(!filtersOpened)}>
              {filtersOpened ?
                <FaMinus size={10} color='#c183ff' /> :
                <FaPlus size={10} color='#c183ff' />}
              {t('shop.sort')}
            </p>
            <div className={`filters ${filtersOpened ? 'opened' : ''}`} >
              {filtersOpened &&
                <form onChange={handleFilters}>
                  <h3>COLORS</h3>
                  <CustomCheckBox id="couleur" label="Couleur" name="color" />
                  <CustomCheckBox id="nb" label="Noir & Blanc" name="color" />
                  <h3>PRICE</h3>
                  <CustomInput id="price-min" label="MIN" type="number" />
                  <CustomInput id="price-max" label="MAX" type="number" />
                  <SquareButton type="button" label="SEND" onClick={() => console.log(currentFilters)} />
                </form>
              }
            </div>
          </div> */}
          <section className="shop-section oeuvres"
            ref={OEUVRES}>
            <h2>{t("shop.original_art")}</h2>
            <hr />
            <div className="shop-items-container">
              {shopItems?.filter((si: any) => si.data().category === ITEM_CATEGORIES.OG_ART).map((item: any, idx: number) => {
                return (
                  <ShopItem
                    key={idx}
                    id={item.data().name}
                    image={item.data().image}
                    size={item.data().size}
                    type={item.data().type}
                    available={item.data().available}
                    rarity={item.data().rarity}
                    price={item.data().price} />
                )
              })}
            </div>
          </section>
          <section className="shop-section prints"
            ref={PRINTS}>
            <h2>{t("shop.prints")}</h2>
            <hr />
            <div className="shop-items-container">
              {shopItems?.filter((si: any) => si.data().category === ITEM_CATEGORIES.PRINTS).map((item: any, idx: number) => {
                return (
                  <ShopItem
                    key={idx}
                    id={item.data().name}
                    image={item.data().image}
                    size={item.data().size}
                    type={item.data().type}
                    available={item.data().available}
                    rarity={item.data().rarity}
                    price={item.data().price} />
                )
              })}
            </div>
          </section>
          <section className="shop-section merch"
            ref={MERCH}>
            <h2>{t("shop.merch")}</h2>
            <hr />
            <div className="shop-items-container">
              {shopItems?.filter((si: any) => si.data().category === ITEM_CATEGORIES.MERCH).map((item: any, idx: number) => {
                return (
                  <ShopItem
                    key={idx}
                    id={item.data().name}
                    image={item.data().image}
                    type={item.data().type}
                    available={item.data().available}
                    rarity={item.data().rarity}
                    size={item.data().size}
                    price={item.data().price} />
                )
              })}
            </div>
          </section>
        </div>
      }
    </>
  )
}

export default Shop
import React, { Ref, useEffect, useRef, useState } from 'react'
import ShopItem from '../components/ShopItem'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import ShopFilter from '../components/Filters/ShopFilter';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firebaseDB, firebaseStorage } from '../utils/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { FlashesService } from '../services/flashes.services';
import { ReactComponent as CONSTRUCTION } from '../assets/construction.svg'
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import SquareButton from '../components/UI/SquareButton';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaMinus } from "react-icons/fa";
import CustomCheckBox from '../components/CustomCheckBox';


export interface IShop {
}

/*THIS WILL NEED A MAJOR REFACTOR. IM JUST PLAYING AROUND NOW */

const Shop = ({ }: IShop) => {
  let navigation = useNavigate()
  const [shopItems, setShopItems] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpened, setFiltersOpened] = useState(false)
  const { t } = useTranslation()
  const OEUVRES = useRef<HTMLElement>(null)
  const PRINTS = useRef<HTMLElement>(null)
  const MERCH = useRef<HTMLElement>(null)

  const fetchData = async () => {
    const flashes: any = await FlashesService.list('shop-items');
    if (flashes.empty) {
      console.error('No items!')
      return
    }
    setShopItems(flashes.docs)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])


  const scrollInView = (where: any) => {
    if (where) {
      where.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* <ShopFilter /> */}
      {!isLoading &&
        <div className="shop-container">
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
          <div className="shop-filters">
            <p onClick={() => setFiltersOpened(!filtersOpened)}>
              {filtersOpened ?
                <FaMinus size={10} color='#c183ff' /> :
                <FaPlus size={10} color='#c183ff' />}
              {t('shop.sort')}
            </p>
            <div className={`filters ${filtersOpened ? 'opened' : ''}`} >
              {filtersOpened &&
                <form>
                  <CustomCheckBox id="couleur" label="Couleur" />
                  <CustomCheckBox id="nb" label="Noir & Blanc" />
                </form>
              }
            </div>
          </div>
          <section className="shop-section oeuvres"
            ref={OEUVRES}>
            <h2>{t("shop.original_art")}</h2>
            <hr />
            <div className="shop-items-container">
              {shopItems.map((item: any, idx: number) => {
                return (
                  <ShopItem
                    key={idx}
                    id={item.data().name}
                    image={item.data().image}
                    size={item.data().size}
                    type={item.data().type}
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
              {shopItems.map((item: any, idx: number) => {
                return (
                  <ShopItem
                    key={idx}
                    id={item.data().name}
                    image={item.data().image}
                    size={item.data().size}
                    type={item.data().type}
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
              {shopItems.map((item: any, idx: number) => {
                return (
                  <ShopItem
                    key={idx}
                    id={item.data().name}
                    image={item.data().image}
                    type={item.data().type}
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
import React, { useEffect, useState } from 'react'
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

export interface IShop {
}

/*THIS WILL NEED A MAJOR REFACTOR. IM JUST PLAYING AROUND NOW */

const Shop = ({ }: IShop) => {
  let navigation = useNavigate()
  const [shopItems, setShopItems] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const flashes: any = await FlashesService.list();
    if (flashes.empty) {
      console.error('No items!')
      return
    }
    setShopItems(flashes.docs)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
      {!isLoading &&
        <div className='shop'>
          <div className="shop-container">
            <ShopFilter />
            <div className="shop-items">
              {shopItems.map((item: any, idx: number) => {
                return (
                  <ShopItem
                    key={idx}
                    id={item.data().name}
                    image={item.data().image}
                    size={item.data().size}
                    price={item.data().price} />
                )
              })}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Shop
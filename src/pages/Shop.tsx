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
  const [shopFlash, setShopFlash] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const flashes: any = await FlashesService.list();
    if (flashes.empty) {
      console.error('No items!')
      return
    }
    setShopFlash(flashes.docs)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
      {!isLoading &&
        <div className='shop page-wrap'>
          <div className="shop-container">
            <ShopFilter />
            <div className="shop-items">
              {shopFlash.map((flash: any, idx: number) => {
                return (
                  <ShopItem
                    key={idx}
                    id={flash.data().name}
                    image={flash.data().image}
                    size={flash.data().size}
                    price={flash.data().price} />
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
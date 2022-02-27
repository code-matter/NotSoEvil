import React, { useEffect, useState } from 'react'
import ShopItem from '../components/ShopItem'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import ShopFilter from '../components/Filters/ShopFilter';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firebaseDB, firebaseStorage } from '../utils/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { FlashesService } from '../services/flashes.services';

export interface IShop {
}

const DUMMY_DATA = [
  {
    id: '111',
    price: 50,
    size: '11 x 17',
    image: '/chien.png',
    type: 1,
  }, {
    id: '112',
    price: 22,
    size: '11 x 17',
    image: '/fraise.png',
    type: 1,
  }, {
    id: '113',
    price: 13.44,
    size: '11 x 17',
    image: '/lapinbleu.png',
    type: 2,
  },
  {
    id: '114',
    price: 8,
    size: '11 x 17',
    image: '/lapinjaune.png',
    type: 2,
  },
  {
    id: '115',
    price: 111.22,
    size: '11 x 17',
    image: '/lapinvert.png',
    type: 2,
  },
  {
    id: '116',
    price: 50,
    size: '11 x 17',
    image: '/chien.png',
    type: 1,
  }, {
    id: '117',
    price: 22,
    size: '11 x 17',
    image: '/fraise.png',
    type: 1,
  }, {
    id: '118',
    price: 13.44,
    size: '11 x 17',
    image: '/lapinbleu.png',
    type: 2,
  },
  {
    id: '119',
    price: 8,
    size: '11 x 17',
    image: '/lapinjaune.png',
    type: 2,
  },
  {
    id: '120',
    price: 111.22,
    size: '11 x 17',
    image: '/lapinvert.png',
    type: 2,
  }
]
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

  const testHandle = async () => {
    const res = await getDownloadURL(ref(firebaseStorage, 'flashes/fraise.png'))
    console.log('res ', res)
  }

  return (
    <div className='shop page-wrap'>
      {!isLoading &&
        <>
          <span className="go-back-btn" onClick={() => navigation('/')}>
            <BsArrowLeft color='#ff7a9f' size={24} />
          </span>
          <div className="shop-container">
            <ShopFilter />
            <button
              onClick={() => {
                console.log('shopFlash', shopFlash);
                testHandle()
                // shopFlash.forEach((flash: any) => {
                //   console.log(flash.id, '::', flash.data());
                // });
              }}
              disabled={isLoading}
            >CLG</button>
            <div className="shop-items">
              {shopFlash.map((flash: any, idx: number) => {
                console.log(flash.data());
                return (
                  <ShopItem
                    id={flash.data().name}
                    image={flash.data().image}
                    size={flash.data().size}
                    price={flash.data().price} />
                )
              })}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Shop
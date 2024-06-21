import React, {useEffect, useState} from 'react';
import cn from './layuot.module.css'
import {useOutlet, useSearchParams} from "react-router-dom";
import './layout.css'
import {ShippingCardContext} from "../context/shippingCardContext";

// @ts-ignore
let tg = window.Telegram.WebApp;

export type PositionId = string | number

const Layout = () => {
  const outlet = useOutlet()
  const [shippingCard, setShippingCard] = useState<Record<PositionId, number>>({})

  let [getSearchParams] = useSearchParams()

  const addToShippingCard = (id: PositionId, count?: number) => {
    if (count) {
      setShippingCard(prev => ({...prev, [id]: count}))
    }

    if (shippingCard[id]) {
      const prevCount = shippingCard[id]
      setShippingCard(prev => ({...prev, [id]: prevCount + 1}))
    } else {
      setShippingCard(prev => ({...prev, [id]: 1}))
    }
  }

  const removeFromShippingCard = (id: PositionId) => {
    if (shippingCard[id]) {
      const count = shippingCard[id]
      if (count === 1) {

        const newObj = Object.keys(shippingCard)
          .filter(key => key != id)
          .reduce((obj, key) => {
            // @ts-ignore
            obj[key] = shippingCard[key];
            return obj;
          }, {});

        setShippingCard(newObj)
        return
      } else {
        setShippingCard(prev => ({...prev, [id]: count - 1}))
      }
    } else {
      setShippingCard(prev => ({...prev, [id]: 1}))
    }
  }


  useEffect(() => {
    const queryOrder = getSearchParams.get("order")

    if (Object.values(shippingCard).length || !queryOrder) return

    try {
      const order = JSON.parse(queryOrder);
      setShippingCard(order)
    } catch {
      console.log("Wrong order");
    }

  }, [])


  const sendDataToTelegram = () => {
    // @ts-ignore
    tg.sendData(JSON.stringify(shippingCard));
  }

  const isButtonVisible = Object.values(shippingCard).length
  useEffect(() => {
    if (isButtonVisible && tg) {
      tg.MainButton.setText('Я заполнил заказ');
      tg.MainButton.show();
      tg.MainButton.enable();
      tg.MainButton.onClick(sendDataToTelegram);
    }
    return () => {
      if(tg){
        tg.MainButton.disable();
        tg.MainButton.offClick(sendDataToTelegram);
      }
    };
  }, [isButtonVisible, sendDataToTelegram]);

  return (
    <ShippingCardContext.Provider value={{shippingCard, addToShippingCard, removeFromShippingCard}}>
      <div className={cn.layout}>
        {outlet}
      </div>
    </ShippingCardContext.Provider>
  );
};

export default Layout;

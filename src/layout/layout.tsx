import React, {useState} from 'react';
import cn from './layuot.module.css'
import {useOutlet} from "react-router-dom";
import './layout.css'
import {ShippingCardContext} from "../context/shippingCardContext";

export type PositionId = string | number

const Layout = () => {
  const outlet = useOutlet()
  const [shippingCard, setShippingCard] = useState<Record<PositionId, number>>({})

  const addToShippingCard = (id: PositionId, count?: number) =>{
    if(count){
      setShippingCard(prev => ({...prev, [id]: count}))
    }

    if(shippingCard[id]){
      const prevCount = shippingCard[id]
      setShippingCard(prev => ({...prev, [id]: prevCount + 1}))
    } else{
      setShippingCard(prev => ({...prev, [id]: 1}))
    }
  }

  const removeFromShippingCard = (id: PositionId) =>{
    if(shippingCard[id]){
      const count = shippingCard[id]
      if(count === 1){

        const newObj  = Object.keys(shippingCard)
          .filter(key => key != id)
          .reduce((obj, key) => {
            // @ts-ignore
            obj[key] = shippingCard[key];
            return obj;
          }, {});

        setShippingCard( newObj)
        return
      } else{
        setShippingCard(prev => ({...prev, [id]: count - 1 }))
      }
    } else{
      setShippingCard(prev => ({...prev, [id]: 1}))
    }
  }

  return (
    <ShippingCardContext.Provider value={{shippingCard, addToShippingCard, removeFromShippingCard}}>
      <div className={cn.layout}>
        {outlet}
      </div>
    </ShippingCardContext.Provider>
  );
};

export default Layout;

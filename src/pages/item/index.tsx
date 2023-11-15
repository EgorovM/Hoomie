import React, {useContext, useEffect, useState} from 'react';
import {ShippingCardContext} from "../../context/shippingCardContext";
import {useNavigate, useParams} from "react-router-dom";
import {Position} from "../../API/types";
import {menuRequest} from "../../API/api";
import cn from './item.module.css'

const Item = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {shippingCard, addToShippingCard} = useContext(ShippingCardContext)
  const [position, setPosition] = useState<Position>()

  const [countToAdd, setCountToAdd] = useState<number>(1)

  const isInShippingCard = Boolean(id && shippingCard[id])

  useEffect(() => {
    menuRequest.getPositionsById(Number(id))
      .then(({data}) => setPosition(data))
      .catch(() => navigate(-1))
  }, [])

  const addCount = () =>{
    setCountToAdd(prev => prev+1)
  }

  const removeCount = () =>{
    if(countToAdd - 1 < 1) return
    setCountToAdd(prev => prev-1)
  }

  const onAddClick = () => {
    if(id){
      addToShippingCard(id, countToAdd)
      navigate(-1)
    }
  }

  return position && id ?
    <>
      <div className={cn.productInfo}>
        <img className={cn.productIcon} src={position.image} alt=""/>
        <div className={cn.productTitle}>{position.name}</div>
        <div className={cn.productDescription}>{position.description}</div>
      </div>

      {isInShippingCard &&
        <div className={cn.notification}>
          <div className={cn.title}>В корзине</div>
          <div className={cn.count}>
            <span>{position.name}</span>
            <span>{shippingCard[position.id]} шт</span>
          </div>
        </div>
      }

      <div className={cn.bottomBar}>
        <div className={cn.counterWrapper}>
          <button className={cn.button} onClick={removeCount}>-</button>
          <div className={cn.vlaue}>{countToAdd}</div>
          <button className={cn.button} onClick={addCount}>+</button>
        </div>
          <button className={cn.button} onClick={onAddClick}>
            Добавить {(countToAdd * position.price).toFixed(2)} ₽
          </button>
      </div>
    </>
    : null
};

export default Item;

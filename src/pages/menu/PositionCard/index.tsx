import React, {FC, MouseEventHandler, useContext} from 'react';
import {Position} from "../../../API/types";
import cn from './PositionCard.module.css'
import {ShippingCardContext} from "../../../context/shippingCardContext";
import ButtonCounter from "./ButtonCounter";
import {useNavigate} from "react-router-dom";

type PositionCardProps = {
  position: Position
  count?: number
}

const PositionCard: FC<PositionCardProps> = ({position, count}) => {
  const {
    id,
    image,
    name,
    price,
    description,
  } = position

  const {addToShippingCard, removeFromShippingCard} = useContext(ShippingCardContext)

  const navigate = useNavigate()

  const onCardClick: MouseEventHandler<HTMLDivElement> = (event) => {
    navigate(`/menu/${id}`)
  }

  return (
    <div className={`${cn.card} ${count ? cn.active : ''}`} onClick={onCardClick}>
      <img className={cn.cardImg} src={image} alt=""/>
      <div className={cn.title}>{name}</div>
      <div className={cn.description}>{description}</div>
      {count ? <ButtonCounter
          onMinusClick={() => removeFromShippingCard(id)}
          onPlusClick={() => addToShippingCard(id)}
          value={count}
        /> :
        <button className={cn.addButton} onClick={(e) => {e.stopPropagation(); addToShippingCard(id)}}>{price.toFixed(2)} ₽</button>
      }
    </div>
  );
};

export default PositionCard;

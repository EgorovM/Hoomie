import React, {FC, MouseEventHandler} from 'react';
import cn from './ButtonCounter.module.css'

type ButtonCounterProps = {
  value: number
  onPlusClick: ()=>void
  onMinusClick: ()=>void
}

const ButtonCounter:FC<ButtonCounterProps> = ({value, onPlusClick, onMinusClick}) => {

const onMinus:MouseEventHandler<HTMLButtonElement>  = (event) =>{
  event.stopPropagation()
  onMinusClick()
}

const onPlus:MouseEventHandler<HTMLButtonElement>  = (event) =>{
  event.stopPropagation()
  onPlusClick()
}

const onWrapperClick: MouseEventHandler<HTMLDivElement> = (event) =>{
  event.stopPropagation()
}

  return (
    <div className={cn.wrapper} onClick={onWrapperClick}>
      <button onClick={onMinus} className={cn.button}>-</button>
      <div className={cn.value}>
        {value}
      </div>
      <button onClick={onPlus} className={cn.button}>+</button>
    </div>
  );
};

export default ButtonCounter;

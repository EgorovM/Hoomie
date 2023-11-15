import React, {FC, MouseEventHandler} from 'react';
import {Category} from "../../../API/types";
import cn from './categoryTag.module.css'

type Props = {
  category: Category
  selected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

const CategoryTag:FC<Props> = ({selected, category, onClick}) => {
  const {name, image} = category
  return (
    <button className={`${cn.tag} ${selected ? cn.active :''}`} onClick={onClick}>
      <img src={image} alt="img"/>
      {name}
    </button>
  );
};

export default CategoryTag;

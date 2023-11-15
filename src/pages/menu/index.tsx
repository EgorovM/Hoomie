import React, {useContext, useEffect, useState} from 'react';
import {menuRequest} from "../../API/api";
import {Category, Position} from "../../API/types";
import cn from './menu.module.css'
import CategoryTag from "./CategoryTag";
import PositionCard from "./PositionCard";
import positionCard from "./PositionCard";
import {ShippingCardContext} from "../../context/shippingCardContext";

const Menu = () => {
  const [categories, setCategories] = useState<Array<Category>>()
  const [selectedCategory, setSelectedCategory] = useState<Category>()

  const [positions, SetPositions] = useState<Array<Position>>()

  const {shippingCard} = useContext(ShippingCardContext)

  useEffect(() => {
    menuRequest.getCategories().then(({data}) => setCategories(data))
    if (selectedCategory) {
      menuRequest.getPositionsByCategory(selectedCategory.id).then(({data}) => SetPositions(data))
    } else {
      menuRequest.getPositions().then(({data}) => SetPositions(data))
    }

  }, [])

  return (
    <>
        <div className={cn.galery}>
          {categories?.map((category) =>
            <CategoryTag
              category={category}
              selected={category.id === selectedCategory?.id}
              onClick={()=>setSelectedCategory(category)}
            />
          )}
        </div>
      <div className={ cn.positionsWrapper}>
        {positions?.map(position => <PositionCard position={position} count={shippingCard[position.id]}/>)}
      </div>
    </>
  );
};

export default Menu;

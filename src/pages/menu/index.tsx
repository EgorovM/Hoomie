import React, {useContext, useEffect, useState} from 'react';
import {menuRequest} from "../../API/api";
import {Category, Position} from "../../API/types";
import cn from './menu.module.css'
import CategoryTag from "./CategoryTag";
import PositionCard from "./PositionCard";
import {ShippingCardContext} from "../../context/shippingCardContext";

const Menu = () => {
  const [categories, setCategories] = useState<Array<Category>>()
  const [selectedCategory, setSelectedCategory] = useState<Category>()

  const [positions, SetPositions] = useState<Array<Position>>()

  const {shippingCard} = useContext(ShippingCardContext)

  useEffect(() => {
    menuRequest.getCategories().then(({data}) => setCategories(data))
    menuRequest.getPositions().then(({data}) => SetPositions(data))
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      menuRequest.getPositionsByCategory(selectedCategory.id).then(({data}) => SetPositions(data))
    } else {
      menuRequest.getPositions().then(({data}) => SetPositions(data))
    }
  }, [selectedCategory])

  return (
    <>
      <div className={cn.galery}>
        {categories?.map((category) =>
          <CategoryTag
            key={category.id}
            category={category}
            selected={category.id === selectedCategory?.id}
            onClick={() => {
              if (category.id === selectedCategory?.id) {
                setSelectedCategory(undefined)
              } else {
                setSelectedCategory(category)
              }
            }}
          />
        )}
      </div>
      <div className={cn.positionsWrapper}>
        {positions?.map(position => <PositionCard key={position.id} position={position} count={shippingCard[position.id]}/>)}
      </div>
    </>
  );
};

export default Menu;

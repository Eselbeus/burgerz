import React, { Component } from 'react';
import BurgerItem from './BurgerItem'

const BurgerList = (props) => {
  let fullBurgers = props.burgers.map(burger => {
    return <BurgerItem burger={burger} showBurger={props.showBurger} hideBurger={props.hideBurger}/>
  })

  return (
    <div className="BurgerList">
      {fullBurgers}
    </div>
  )
}

export default BurgerList

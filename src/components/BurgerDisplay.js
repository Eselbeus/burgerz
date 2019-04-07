import React, { Component } from 'react';

const BurgerDisplay = (props) => {

  return (
    <div className="BurgerDisplay">
      <img src={props.showBurger.imgURL}/>
      <br/>
      <h1>{props.showBurger.name}</h1>
      <br/>
      <select onChange={() => props.changeCategory(props.showBurger.id)}>
        {props.showBurger.category === "Relatable" ? <option value="Relatable">Relatable</option> : <option value="Bougie">Bougie</option>}
        {props.showBurger.category === "Relatable" ? <option value="Bougie">Bougie</option> : <option value="Relatable">Relatable</option>}
      </select>
    </div>
  )
}

export default BurgerDisplay

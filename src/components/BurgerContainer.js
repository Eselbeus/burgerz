import React, { Component } from 'react';
import BurgerList from './BurgerList'
import BurgerFilter from './BurgerFilter'

export default class BurgerContainer extends Component {

  render(){


    return (
      <div className="BurgerContainer">
        <BurgerFilter burgers={this.props.burgers} filterBurgers={this.props.filterBurgers}/>
        <BurgerList burgers={this.props.burgers} showBurger={this.props.showBurger} hideBurger={this.props.hideBurger}/>
      </div>
    )
  }
}

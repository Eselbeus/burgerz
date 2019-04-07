import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BurgerContainer from './components/BurgerContainer'
import BurgerDisplay from './components/BurgerDisplay'

class App extends Component {
  state = {
    burgers: [],
    relatable: [],
    bougie: [],
    showBurger: {},
    filter: "all"
  }

  componentDidMount(){
    fetch('http://localhost:3001/burgers')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          burgers: json,
          relatable: json.filter(burger => {
            return burger.category === "Relatable"
          }),
          bougie: json.filter(burger => {
            return burger.category === "Bougie"
          })
        })
      })
  }

  filterBurgers = (e) => {
    if (e.target.value === "Relatable"){
      this.setState({
        filter: "relatable"
      })
    }
    else if (e.target.value === "Bougie"){
      this.setState({
        filter: "bougie"
      })
    }
    else if (e.target.value === "All"){
      this.setState({
        filter: "all"
      })
    }

  }

  showBurger = (id) => {
    let stateShowCopy = {...this.state.showBurger}
    let findBurger = this.state.burgers.find(burger => burger.id === id)
    this.setState({
      showBurger: findBurger
    })

  }

  hideBurger = (id) => {
    console.log(id)
    // let findBurger = this.state.burgers.find(burger => burger.id === id)
    let burgersMinusOne = this.state.burgers.filter(burger => {
      return burger.id !== id
    })
    this.setState({
      burgers: burgersMinusOne,
      relatable: burgersMinusOne.filter(burger => {
        return burger.category === "Relatable"
      }),
      bougie: burgersMinusOne.filter(burger => {
        return burger.category === "Bougie"
      })
    })
  }

  changeCategory = (id) => {
    let findId = this.state.burgers.find(burger => burger.id === id)
    let oppositeCategory = ''
    if (findId.category === "Relatable"){
      oppositeCategory = "Bougie"
    }
    else if (findId.category === "Bougie"){
      oppositeCategory = "Relatable"
    }

    let configObj = {
      method: "PATCH",
      headers: {
        'Content-Type': 'Application/json',
        'Accept': 'Application/json'
      },
      body: JSON.stringify({
        category: oppositeCategory
      })
    }

    fetch(`http://localhost:3001/burgers/${id}`, configObj)
    .then(resp => resp.json())
    .then(json => {
      let updatedBurgers = this.state.burgers.map(burger => {
        if (burger.id !== json.id){
          return burger
        }
        else {
          return {...burger, category: json.category}
        }
      })
      // console.log(json.category)
      // console.log(this.state.showBurger)
      this.setState({
        burgers: updatedBurgers,
        relatable: updatedBurgers.filter(burger => {
          return burger.category === "Relatable"
        }),
        bougie: updatedBurgers.filter(burger => {
          return burger.category === "Bougie"
        }),
        showBurger: {...json}
      })
    })
  }

  render() {
    let filteredBurgers = this.state.burgers
    if (this.state.filter === "relatable"){
      filteredBurgers = this.state.relatable
    }
    else if (this.state.filter === "bougie"){
      filteredBurgers = this.state.bougie
    }
    else if (this.state.filter === "all"){
      filteredBurgers = this.state.burgers
    }

    return (
      <div id="App">
        <BurgerContainer burgers={filteredBurgers} showBurger={this.showBurger} filterBurgers={this.filterBurgers} hideBurger={this.hideBurger}/>
        <BurgerDisplay showBurger={this.state.showBurger} changeCategory={this.changeCategory}/>
      </div>
    );
  }
}

export default App;

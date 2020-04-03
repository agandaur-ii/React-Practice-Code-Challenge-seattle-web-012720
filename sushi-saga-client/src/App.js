import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

const plateArray = []

class App extends Component {

  constructor() {
    super();

    this.state = {
      sushi: [],
      currentSushis: [],
      total: 200
    }
  }

  componentDidMount() {
    this.fetchSushi()
  }

  fetchSushi = () => {
    fetch(API)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      this.setState({
        sushi: data
      })
      this.setCurrentSushi()
    })
  }

  setCurrentSushi = () => {
    let id
    if (this.state.currentSushis.length === 0) {
      id = 0
    } else {
      id = this.state.currentSushis[3].id
    }
    let fourArray = []
    for (let i = id; i < (id + 4); i++) {
      fourArray.push(this.state.sushi[i])
    }
    this.setState({
      currentSushis: fourArray
    })
  }

  addPlate = () => {
    plateArray.push("PLATE")
  }

  changeTotal = (price) => {
    this.setState({
      total: (this.state.total - price)
    })
  }

  eatSushi = (id) => {
    this.setState(prevState => {
      return {
        currentSushis: prevState.currentSushis.map(sushi => {
          if (sushi.id !== id) {
            return sushi
          } else {
            if (sushi.price > this.state.total) {
              return sushi
            } else {
              this.changeTotal(sushi.price)
              this.addPlate()
              return {...sushi, img_url: null}
            }
          }
        })
      }
    })
  }


  render() {
    return (
      <div className="app">
        <SushiContainer fourSushi={this.state.currentSushis} 
        nextSushis={this.setCurrentSushi}
        eatSushi={this.eatSushi}
        />
        <Table addPlate={plateArray} total={this.state.total}/>
      </div>
    );
  }
}

export default App;
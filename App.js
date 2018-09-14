import React from 'react';
import Home from './src/Views/Home';
import Scheduler from './src/Views/Scheduler'

export default class App extends React.Component {
  state = {
    cores: '',
    processos: '',
    quantum: '',
    quantumHasValue: false,
  }

  placeCoresChangedHandler = (input) => {
    this.setState({
      cores: input
    })
  }

  placeProcessosChangedHandler = (input) => {
    this.setState({
      processos: input
    })
  }

  placeQuantumChangedHandler = (input) => {
    if (input.length !== 0) {
      this.setState({
        quantum: input,
        quantumHasValue: true
      })
    } else {
      this.setState({
        quantum: input,
        quantumHasValue: false
      })
    }
  }



  render() {
    return (
      <Home />
      //<Scheduler />
      
    );
  }
}

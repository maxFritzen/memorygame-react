import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      turn: 1,
      pattern: [],
      clicked: []
    };
  }
  createPattern = () => {
    console.log('createPattern');
    let pattern = [];
    let currentTurn = this.state.turn;
    let length = pattern.length + currentTurn;
    for( let i = 0; i < length; i++ ) {
      const rand = Math.floor(Math.random() * 9);
      pattern[i] = rand;
    }
    this.nextTurn();
    this.setState({
      pattern: pattern,
      clicked: []
    });
  };
  correct = () => {
    console.log('correcting');
    let index = this.state.clicked.length - 1;
    const result = this.state.pattern[index] === this.state.clicked[index] ? true : false;
    console.log(result);
    if (result) {
      if (this.state.clicked.length === this.state.pattern.length) {
        this.createPattern();
      }
    } else {
      // set turn to 1
      this.setState ({ turn: 1});
    }
  };
  handleClick = (id) => {
    console.log('handleClick', id);
    this.setState({
      clicked: [...this.state.clicked, id]
    }, this.correct);
  };
  nextTurn = () => {
    this.setState((prevState) => {
      return { turn : prevState.turn + 1 };
    });
  }
  render() {
    return (
      <div>
        <p>Turn: {this.state.turn}</p>
        <p>Clicked: {this.state.clicked}</p>
        <p>Pattern: {this.state.pattern}</p>
        <Board
          turn={this.state.turn}
          nextTurn={this.nextTurn}
          pattern={this.state.pattern}
          clicked={this.state.clicked}
          onClick={this.handleClick}
        />
        <button onClick={this.createPattern}>Next turn and new pattern</button>
      </div>
    );
  }
}

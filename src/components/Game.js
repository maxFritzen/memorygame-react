import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      turn: 1
    };
  }
  nextTurn = () => {
    this.setState((prevState) => {
      return { turn : prevState.turn + 1 };
    });
  }
  render() {
    return (
      <div>
        <p>Turn: {this.state.turn}</p>
        <Board turn={this.state.turn} nextTurn={this.nextTurn}/>
      </div>
    );
  }
}

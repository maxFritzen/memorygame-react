import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: [],
      clicked: []
    }
  };
  createPattern = () => {
    console.log('createPattern');
    let pattern = [];
    let currentTurn = this.props.turn;
    let length = pattern.length + currentTurn;
    for( let i = 0; i < length; i++ ) {
      const rand = Math.floor(Math.random() * 9);
      pattern[i] = rand;
    }
    this.props.nextTurn();
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
    if (result && this.state.clicked.length === this.state.pattern.length) {
      this.createPattern();
    } else {
      // set turn to 0
    }

  };
  handleClick = (id) => {

    this.setState({
      clicked: [...this.state.clicked, id]
    }, this.correct);
  };
  renderSquare = (id) => {
    return <Square id={id} handleClick={() => this.handleClick(id)}/>;
  };

  render() {

    return (
      <div>
        <p>Clicked: {this.state.clicked}</p>
        <p>Pattern: {this.state.pattern}</p>
        <button onClick={() => console.log(this.correct())}>correct</button>
        <div className="board">
          <div className="board__row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board__row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board__row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <div>
          <button onClick={this.createPattern}>Next turn and new pattern</button>
        </div>
      </div>

    );
  }
}

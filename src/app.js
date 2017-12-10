import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Game from './components/Game';
// class Square extends React.Component {
//   constructor(props) {
//     super();
//
//   }
//   render() {
//     return (
//         <button
//           id={this.props.id}
//           onClick={this.props.handleClick}
//           >{this.props.id}</button>
//     )
//   }
// }

// class Board extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pattern: [],
//       clicked: []
//     }
//   };
//   createPattern = () => {
//     console.log('createPattern');
//     let pattern = [];
//     let currentTurn = this.props.turn;
//     let length = pattern.length + currentTurn;
//     for( let i = 0; i < length; i++ ) {
//       const rand = Math.floor(Math.random() * 9);
//       pattern[i] = rand;
//     }
//     this.props.nextTurn();
//     this.setState({
//       pattern: pattern,
//       clicked: []
//     });
//   };
//   correct = () => {
//     console.log('correcting');
//     let index = this.state.clicked.length - 1;
//     const result = this.state.pattern[index] === this.state.clicked[index] ? true : false;
//     console.log(result);
//     if (result) {
//       this.createPattern();
//     } else {
//       // set turn to 0
//     }
//
//   };
//   handleClick = (id) => {
//
//     this.setState({
//       clicked: [...this.state.clicked, id]
//     }, this.correct);
//   };
//   renderSquare = (id) => {
//     return <Square id={id} handleClick={() => this.handleClick(id)}/>;
//   };
//
//   render() {
//
//     return (
//       <div>
//         <p>Clicked: {this.state.clicked}</p>
//         <p>Pattern: {this.state.pattern}</p>
//         <button onClick={() => console.log(this.correct())}>correct</button>
//         <div className="board">
//           <div className="board__row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board__row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board__row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//         <div>
//           <button onClick={this.createPattern}>Next turn and new pattern</button>
//         </div>
//       </div>
//
//     );
//   }
// }

// class Game extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       turn: 1
//     };
//   }
//   nextTurn = () => {
//     this.setState((prevState) => {
//       return { turn : prevState.turn + 1 };
//     });
//   }
//   render() {
//     return (
//       <div>
//         <p>Turn: {this.state.turn}</p>
//         <Board turn={this.state.turn} nextTurn={this.nextTurn}/>
//       </div>
//     );
//   }
// }

const App = () => (
  <div>
    <Game />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

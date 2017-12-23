import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import database from '../firebase/firebase';
import AddHighscore from './AddHighscore';
import Highscore from './Highscore';
import LoadingPage from './LoadingPage';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      fail: false,
      turn: 1,
      score: 0,
      pattern: [],
      clicked: [],
      highscore: [{
        score:1,
        username:"test"
      }],
      highscoreWorthy: false,
      isLoading: false
    };
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const highscore = [];
    return database.ref('highscore').orderByChild('score')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          highscore.push({
            score: childSnapshot.val().score,
            username: childSnapshot.val().username
          });
        });
        highscore.reverse();
        this.setState({
          highscore: highscore,
          isLoading: false
        });
      });
  };
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
  checkIfHighscore = (score, highscore) => {
    console.log('checkIfHighscore', score, 'highscore:', highscore);
    console.log(score >= highscore);
    const highscoreWorthy = score >= highscore;
    this.setState({ highscoreWorthy });
  };
  correct = () => {
    console.log('correcting');
    let index = this.state.clicked.length - 1;
    const result = this.state.pattern[index] === this.state.clicked[index] ? true : false;
    if (result) {
      if (this.state.clicked.length === this.state.pattern.length) {
        this.setState((prevState) => {
          return { score: prevState.score + 1 };
        });
        this.createPattern();
      }
    } else {
      // set turn to 1
      console.log(this.state.highscore[this.state.highscore.length -1].score);
      this.checkIfHighscore(this.state.score, this.state.highscore[this.state.highscore.length -1].score);
      this.setState ({ turn: 1}, this.createPattern);
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
  };
  render() {
    if (this.state.isLoading) {
      return <LoadingPage />;
    }
    const highscoreWorthy = this.state.highscoreWorthy;
    return (
      <div>
        <p>Score: {this.state.score}</p>
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
        <div>
          <Highscore highscore={this.state.highscore}/>
        </div>
        <div>
          {highscoreWorthy && <AddHighscore score={this.state.score} />}

        </div>
      </div>
    );
  }
}

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
      blinkingPattern: [],
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
    this.index = 0; //for blink
    this.patternDone = true;
    // this.interval = setInterval(() => this.blink(), 1000); //for blink
    this.startInterval = true;
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
    }); //, () => this.blink()
  };
  checkIfHighscore = (score) => {
    if ( (this.state.highscore[999] === undefined || score >= this.state.highscore[999].score) && score > 0 ) {
        this.setState({ highscoreWorthy: true });
    } else {
      this.setState({ score: 0 });
    }
  };
  correct = () => {
    this.patternDone = false;
    let index = this.state.clicked.length - 1;
    const result = this.state.pattern[index] === this.state.clicked[index] ? true : false;
    if (result) {
      if (this.state.clicked.length === this.state.pattern.length) {
        // this.setState((prevState) => {
        //   return { score: prevState.score + 1 };
        // });
        this.patternDone = true;
        this.setState ({ score: this.state.pattern.length });
        this.createPattern();
      }
    } else {
      // set turn to 1
      const score = this.state.score;
      this.checkIfHighscore(score);
      this.setState ({
        turn: 1
      }, this.createPattern);
    }
  };
  handleClick = (id) => {
    console.log('handleClick', id);
    this.setState({
      clicked: [...this.state.clicked, id]
    }, this.correct);
  };
  blink = () => {
      console.log('blink in Game');
      console.log(this.index);
      console.log('pattern-length', this.state.pattern.length);
      //if index > pattern.length: stop blinking
      if (this.state.pattern.length === this.index +1) {
        console.log('should clear interval', this.interval);

        clearInterval(this.interval);
      } else {
        this.index++;
        console.log(this.index);
      }
      const ref = this.index;
      //Nu borde jag kanske använda ref här i game då för att animera de som stämmer överens med id och this.index.
      //if pattern[this.index] === id: blink

      console.log(ReactDOM.findDOMNode(this.refs.test));
      console.log(ReactDOM.findDOMNode(this.refs.button));
      // // for(let i = 0; i < this.state.pattern.length; i++){
      // //   console.log(this.state.pattern[i]);
      // // }
      // const blinkingPattern = [];
      // for(let i = 0; i < this.state.pattern.length; i++){
      //   blinkingPattern.push(this.state.pattern[i]);
      // }
      // this.setState({
      //   blinkingPattern
      // });
      //console.log(blinkingPattern);

  };
  nextTurn = () => {
    this.setState((prevState) => {
      return { turn : prevState.turn + 1 };
    });
  };
  startGame = () => {

    this.createPattern();
    this.setState({ score: 0 });
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
          blinkingPattern={this.index}
          startInterval={this.startInterval}
          index={this.index}
          patternDone={this.patternDone}
        //  blink={this.state.pattern}
        />
        <button onClick={this.startGame}>Play!</button>
        <div>
          <Highscore highscore={this.state.highscore}/>
        </div>
        <div>
          {highscoreWorthy && <AddHighscore score={this.state.score} highscore={this.state.highscore} />}

        </div>
      </div>
    );
  }
}

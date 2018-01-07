import React from 'react';
import ReactDOM from 'react-dom';
import database from '../firebase/firebase';
import AddHighscore from './AddHighscore';
import Highscore from './Highscore';
import LoadingPage from './LoadingPage';

export default class GameFull extends React.Component {
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
    this.index = 0;
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
    this.resetClasses();
    let pattern = [];
    let currentTurn = this.state.turn;
    let length = pattern.length + currentTurn;
    for( let i = 0; i < length; i++ ) {
      const rand = Math.floor(Math.random() * 3 + 1);
      pattern[i] = rand;
    }

    this.nextTurn();
    this.setState({
      pattern: pattern,
      clicked: []
    }, () => {
      this.intervalId = setInterval(this.startDisplayPattern, 1000);
    });
  };
  checkIfHighscore = (score) => {
    if ( (this.state.highscore[999] === undefined || score >= this.state.highscore[999].score) && score > 0 ) {
        this.setState({ highscoreWorthy: true });
    } else {
      this.setState({ score: 0 });
    }
  };
  correct = () => {
    let index = this.state.clicked.length - 1;
    const result = this.state.pattern[index] == this.state.clicked[index] ? true : false;
    console.log('result = ', result);
    console.log('index = ', index);
    console.log('pattern number = ', this.state.pattern[index]);
    console.log('clicked = ', this.state.clicked[index]);
    if (result) {
      if (this.state.clicked.length === this.state.pattern.length) {
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
  // correct = () => {
  //   this.patternDone = false;
  //   let index = this.state.clicked.length - 1;
  //   const result = this.state.pattern[index] === this.state.clicked[index] ? true : false;
  //   if (result) {
  //     if (this.state.clicked.length === this.state.pattern.length) {
  //       // this.setState((prevState) => {
  //       //   return { score: prevState.score + 1 };
  //       // });
  //       this.patternDone = true;
  //       this.setState ({ score: this.state.pattern.length });
  //       this.createPattern();
  //     }
  //   } else {
  //     // set turn to 1
  //     const score = this.state.score;
  //     this.checkIfHighscore(score);
  //     this.setState ({
  //       turn: 1
  //     }, this.createPattern);
  //   }
  // };
  handleClick = (e) => {

    const id = e.target.id;
    console.log('handleClick', id);
    this.setState({
      clicked: [...this.state.clicked, id]
    }, this.correct);
  };
  // handleClick = (id) => {
  //   console.log('handleClick', id);
  //   this.setState({
  //     clicked: [...this.state.clicked, id]
  //   }, this.correct);
  // };

  nextTurn = () => {
    this.setState((prevState) => {
      return { turn : prevState.turn + 1 };
    });
  };
  startGame = () => {

    this.createPattern();
    this.setState({ score: 0 });
    console.log(ReactDOM.findDOMNode(this.refs.two));
  };
  startDisplayPattern = () => {
    if (this.state.pattern.length === this.index) {
      clearInterval(this.intervalId);
    } else {
      this.displayPattern();
    }
  };
  resetClasses = () => {
    this.index = 0;
    ReactDOM.findDOMNode(this.refs.one).className = ('btn');
    ReactDOM.findDOMNode(this.refs.two).className = ('btn');
    ReactDOM.findDOMNode(this.refs.three).className = ('btn');
  };
  displayPattern = () => {
    console.log('this index:', this.index);
    if (this.state.pattern[this.index] === 1) {
      if (ReactDOM.findDOMNode(this.refs.one).classList.contains('btn--blink')) {
        console.log('class removed');
        ReactDOM.findDOMNode(this.refs.one).classList.remove('btn--blink');
      }
      ReactDOM.findDOMNode(this.refs.one).classList.add('btn--blink');
    } else if (this.state.pattern[this.index] === 2) {
        if (ReactDOM.findDOMNode(this.refs.two).classList.contains('btn--blink')) {
          console.log('class should be removed');
          ReactDOM.findDOMNode(this.refs.two).classList.remove('btn--blink');
        }
        ReactDOM.findDOMNode(this.refs.two).classList.add('btn--blink');
    } else if (this.state.pattern[this.index] === 3) {
        if (ReactDOM.findDOMNode(this.refs.three).classList.contains('btn--blink')) {
          console.log('class removed');
          ReactDOM.findDOMNode(this.refs.three).classList.remove('btn--blink');
        }
        ReactDOM.findDOMNode(this.refs.three).classList.add('btn--blink');
    }
    this.index++;

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
        <div>
          <button ref="one" id="1" className="btn" onClick={this.handleClick}>1</button>
          <button ref="two" id="2" className="btn" onClick={this.handleClick}>2</button>
          <button ref="three" id="3" className="btn" onClick={this.handleClick}>3</button>
        </div>
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

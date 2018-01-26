import React from 'react';
import ReactDOM from 'react-dom';
import database from '../firebase/firebase';
import AddHighscore from './AddHighscore';
import Highscore from './Highscore';
import LoadingPage from './LoadingPage';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
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
    this.setState({disabled: true});
    this.resetClasses();
    let pattern = [];
    let currentTurn = this.state.turn;
    let length = pattern.length + currentTurn;
    for( let i = 0; i < length; i++ ) {
      const rand = Math.floor(Math.random() * 9 + 1);
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

  handleClick = (e) => {
    const id = e.target.id;
    console.log('handleClick', id);
    console.log('className:', e.target.className);
    if (e.target.classList.contains('board__btn--blink')) {
      e.target.classList.remove('board__btn--blink');
    }
    e.target.classList.add('board__btn--blink');
    this.setState({
      clicked: [...this.state.clicked, id]
    }, this.correct);
  };

  nextTurn = () => {
    this.setState((prevState) => {
      return { turn : prevState.turn + 1 };
    });
  };
  startGame = () => {
    this.createPattern();
    this.setState({
      score: 0,
      disabled: true
     });
    console.log(ReactDOM.findDOMNode(this.refs.two));
  };
  startDisplayPattern = () => {

    if (this.state.pattern.length === this.index) {
      clearInterval(this.intervalId);
      this.setState({disabled: false});
    } else {
      this.displayPattern();
    }
  };
  resetClasses = () => {
    this.index = 0;
    ReactDOM.findDOMNode(this.refs.one).className = ('board__btn');
    ReactDOM.findDOMNode(this.refs.two).className = ('board__btn');
    ReactDOM.findDOMNode(this.refs.three).className = ('board__btn');
    ReactDOM.findDOMNode(this.refs.four).className = ('board__btn');
    ReactDOM.findDOMNode(this.refs.five).className = ('board__btn');
    ReactDOM.findDOMNode(this.refs.six).className = ('board__btn');
    ReactDOM.findDOMNode(this.refs.seven).className = ('board__btn');
    ReactDOM.findDOMNode(this.refs.eight).className = ('board__btn');
    ReactDOM.findDOMNode(this.refs.nine).className = ('board__btn');
  };
  displayPattern = () => {
    console.log('this index:', this.index);
    const buttonOne = ReactDOM.findDOMNode(this.refs.one);
    const buttonTwo = ReactDOM.findDOMNode(this.refs.two);
    const buttonThree = ReactDOM.findDOMNode(this.refs.three);
    const buttonFour = ReactDOM.findDOMNode(this.refs.four);
    const buttonFive = ReactDOM.findDOMNode(this.refs.five);
    const buttonSix = ReactDOM.findDOMNode(this.refs.six);
    const buttonSeven = ReactDOM.findDOMNode(this.refs.seven);
    const buttonEight = ReactDOM.findDOMNode(this.refs.eight);
    const buttonNine = ReactDOM.findDOMNode(this.refs.nine);

    if (this.state.pattern[this.index] === 1) {
      if (buttonOne.classList.contains('board__btn--blink')) {
        console.log('class should be removed');
        buttonOne.classList.remove('board__btn--blink');
        setTimeout(() => {buttonOne.classList.add('board__btn--blink');}, 50);
      } else {
        buttonOne.classList.add('board__btn--blink');
      }

    } else if (this.state.pattern[this.index] === 2) {
        if (buttonTwo.classList.contains('board__btn--blink')) {
          console.log('class should be removed');
          buttonTwo.classList.remove('board__btn--blink');
          setTimeout(() => {buttonTwo.classList.add('board__btn--blink');}, 50);
        } else {
          buttonTwo.classList.add('board__btn--blink');
        }
    } else if (this.state.pattern[this.index] === 3) {
        if (buttonThree.classList.contains('board__btn--blink')) {
          console.log('class should be removed');
          buttonThree.classList.remove('board__btn--blink');
          setTimeout(() => {buttonThree.classList.add('board__btn--blink');}, 50);
        } else {
          buttonThree.classList.add('board__btn--blink');
        }
    } else if (this.state.pattern[this.index] === 4) {
        if (buttonFour.classList.contains('board__btn--blink')) {
          console.log('class should be removed');
          buttonFour.classList.remove('board__btn--blink');
          setTimeout(() => {buttonFour.classList.add('board__btn--blink');}, 50);
        } else {
          buttonFour.classList.add('board__btn--blink');
        }
    } else if (this.state.pattern[this.index] === 5) {
        if (buttonFive.classList.contains('board__btn--blink')) {
          console.log('class should be removed');
          buttonFive.classList.remove('board__btn--blink');
          setTimeout(() => {buttonFive.classList.add('board__btn--blink');}, 50);
        } else {
          buttonFive.classList.add('board__btn--blink');
        }
    } else if (this.state.pattern[this.index] === 6) {
        if (buttonSix.classList.contains('board__btn--blink')) {
          console.log('class should be removed');
          buttonSix.classList.remove('board__btn--blink');
          setTimeout(() => {buttonSix.classList.add('board__btn--blink');}, 50);
        } else {
          buttonSix.classList.add('board__btn--blink');
        }
    } else if (this.state.pattern[this.index] === 7) {
        if (buttonSeven.classList.contains('board__btn--blink')) {
          console.log('class should be removed');
          buttonSeven.classList.remove('board__btn--blink');
          setTimeout(() => {buttonSeven.classList.add('board__btn--blink');}, 50);
        } else {
          buttonSeven.classList.add('board__btn--blink');
        }

    } else if (this.state.pattern[this.index] === 8) {
        if (buttonEight.classList.contains('board__btn--blink')) {
          console.log('class should be removed');
          buttonEight.classList.remove('board__btn--blink');
          setTimeout(() => {buttonEight.classList.add('board__btn--blink');}, 50);
        } else {
          buttonEight.classList.add('board__btn--blink');
        }

    } else if (this.state.pattern[this.index] === 9) {
        if (buttonNine.classList.contains('board__btn--blink')) {
          console.log('class should be removed');
          buttonNine.classList.remove('board__btn--blink');
          setTimeout(() => {buttonNine.classList.add('board__btn--blink');}, 50);
        } else {
          buttonNine.classList.add('board__btn--blink');
        }
    }
    this.index++;

  };
  render() {
    if (this.state.isLoading) {
      return <LoadingPage />;
    }
    const highscoreWorthy = this.state.highscoreWorthy;
    console.log('pattern:', this.state.pattern);
    return (

      <div className="container">
        <div className="row">
          <div className="header ">
            <div className="header__content">
              <div className="header__primary u-margin-bottom-small">
                <h1>Memory Game</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="score u-margin-bottom-medium">
              <p className="">Score: {this.state.score}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-1-of-4">&nbsp;</div>
          <div className="col-2-of-4 board">
            <div className="board__row">
              <button ref="one" id="1" className="board__btn" onClick={this.handleClick} disabled={this.state.disabled}>1</button>
              <button ref="two" id="2" className="board__btn" onClick={this.handleClick} disabled={this.state.disabled}>2</button>
              <button ref="three" id="3" className="board__btn" onClick={this.handleClick} disabled={this.state.disabled}>3</button>
            </div>
            <div className="board__row">
              <button ref="four" id="4" className="board__btn" onClick={this.handleClick} disabled={this.state.disabled}>4</button>
              <button ref="five" id="5" className="board__btn" onClick={this.handleClick} disabled={this.state.disabled}>5</button>
              <button ref="six" id="6" className="board__btn" onClick={this.handleClick} disabled={this.state.disabled}>6</button>
            </div>
            <div className="board__row">
              <button ref="seven" id="7" className="board__btn" onClick={this.handleClick} disabled={this.state.disabled}>7</button>
              <button ref="eight" id="8" className="board__btn" onClick={this.handleClick} disabled={this.state.disabled}>8</button>
              <button ref="nine" id="9" className="board__btn" onClick={this.handleClick} disabled={this.state.disabled}>9</button>
            </div>
          </div>

          <div className="col-1-of-4">
            <Highscore highscore={this.state.highscore}/>
            <div>
              {highscoreWorthy && <AddHighscore score={this.state.score} highscore={this.state.highscore} />}
            </div>
          </div>

        </div>
        <div className="row">
          <button  className="btn btn--play" onClick={this.startGame} disabled={this.state.disabled}>Play!</button>
        </div>



      </div>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';

import database from '../firebase/firebase';
import Highscore from './Highscore';
import LoadingPage from './LoadingPage';
import Nav from './Nav';
import Header from './Header';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      newHighScore: false,
      alert: false,
      showHighscore: false,
      score: 0,
      isLoading: false
    };
    this.index = 0;
    this.turn = 1;
    this.pattern = [];
    this.clicked = [];
    this.highscore = [];
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
          this.highscore = highscore;
          this.setState({
            isLoading: false
          });
        });
  };

  createPattern = () => {
    this.setState({ disabled: true });
    this.resetClasses();
    const pattern = [];
    const length = pattern.length + this.turn;
    for( let i = 0; i < length; i++ ) {
      const rand = Math.floor(Math.random() * 9 + 1);
      pattern[i] = rand;

    }

    this.nextTurn();
    this.pattern = pattern;
    this.clicked = [];
    this.intervalId = setInterval(this.startDisplayPattern, 1000);

  };

  checkIfHighscore = (score) => {
    if ( (this.highscore[999] === undefined || score >= this.highscore[999].score) && score > 0 ) {
      this.setState({
        newHighScore: true,
        alert: true
      });
    }
  };

  correct = () => {
    const index = this.clicked.length - 1;
    const result = this.pattern[index] == this.clicked[index] ? true : false;

    if (result) {
      if (this.clicked.length === this.pattern.length) {
        this.setState ({ score: this.pattern.length });
        this.createPattern();
      }
    } else {
      // set turn to 1.
      // check if highscore
      if (this.state.score >= 0) {
        this.checkIfHighscore(this.state.score);
      }
      this.turn = 1;
      this.createPattern();
    }
  };

  handleClick = (e) => {
    const id = e.target.id;
    this.clicked = [
      ...this.clicked,
      id
    ];
    this.correct();
  };

  nextTurn = () => {
    this.turn = this.turn + 1;
  };

  startGame = () => {
    this.createPattern();
    this.setState({
      score: 0,
      disabled: true
     });

  };
  startDisplayPattern = () => {

    if (this.pattern.length === this.index) {
      clearInterval(this.intervalId);
      this.setState({ disabled: false });
    } else {
      this.displayPattern();
    }
  };
  resetClasses = () => {
    this.index = 0;
    this.refs.one.className = ('board__btn');
    this.refs.two.className = ('board__btn');
    this.refs.three.className = ('board__btn');
    this.refs.four.className = ('board__btn');
    this.refs.five.className = ('board__btn');
    this.refs.six.className = ('board__btn');
    this.refs.seven.className = ('board__btn');
    this.refs.eight.className = ('board__btn');
    this.refs.nine.className = ('board__btn');
  };
  displayPattern = () => {
  if(!this.state.showHighscore) {
    const buttonOne = this.refs.one;
    const buttonTwo = this.refs.two;
    const buttonThree = this.refs.three;
    const buttonFour = this.refs.four;
    const buttonFive = this.refs.five;
    const buttonSix = this.refs.six;
    const buttonSeven = this.refs.seven;
    const buttonEight = this.refs.eight;
    const buttonNine = this.refs.nine;

    if (this.pattern[this.index] === 1) {
      if (buttonOne.classList.contains('board__btn--blink')) {
        buttonOne.classList.remove('board__btn--blink');
        setTimeout(() => {buttonOne.classList.add('board__btn--blink');}, 50);
      } else {
        buttonOne.classList.add('board__btn--blink');
      }

    } else if (this.pattern[this.index] === 2) {
        if (buttonTwo.classList.contains('board__btn--blink')) {
          buttonTwo.classList.remove('board__btn--blink');
          setTimeout(() => {buttonTwo.classList.add('board__btn--blink');}, 50);
        } else {
          buttonTwo.classList.add('board__btn--blink');
        }
    } else if (this.pattern[this.index] === 3) {
        if (buttonThree.classList.contains('board__btn--blink')) {
          buttonThree.classList.remove('board__btn--blink');
          setTimeout(() => {buttonThree.classList.add('board__btn--blink');}, 50);
        } else {
          buttonThree.classList.add('board__btn--blink');
        }
    } else if (this.pattern[this.index] === 4) {
        if (buttonFour.classList.contains('board__btn--blink')) {
          buttonFour.classList.remove('board__btn--blink');
          setTimeout(() => {buttonFour.classList.add('board__btn--blink');}, 50);
        } else {
          buttonFour.classList.add('board__btn--blink');
        }
    } else if (this.pattern[this.index] === 5) {
        if (buttonFive.classList.contains('board__btn--blink')) {
          buttonFive.classList.remove('board__btn--blink');
          setTimeout(() => {buttonFive.classList.add('board__btn--blink');}, 50);
        } else {
          buttonFive.classList.add('board__btn--blink');
        }
    } else if (this.pattern[this.index] === 6) {
        if (buttonSix.classList.contains('board__btn--blink')) {
          buttonSix.classList.remove('board__btn--blink');
          setTimeout(() => {buttonSix.classList.add('board__btn--blink');}, 50);
        } else {
          buttonSix.classList.add('board__btn--blink');
        }
    } else if (this.pattern[this.index] === 7) {
        if (buttonSeven.classList.contains('board__btn--blink')) {
          buttonSeven.classList.remove('board__btn--blink');
          setTimeout(() => {buttonSeven.classList.add('board__btn--blink');}, 50);
        } else {
          buttonSeven.classList.add('board__btn--blink');
        }

    } else if (this.pattern[this.index] === 8) {
        if (buttonEight.classList.contains('board__btn--blink')) {
          buttonEight.classList.remove('board__btn--blink');
          setTimeout(() => {buttonEight.classList.add('board__btn--blink');}, 50);
        } else {
          buttonEight.classList.add('board__btn--blink');
        }

    } else if (this.pattern[this.index] === 9) {
        if (buttonNine.classList.contains('board__btn--blink')) {
          buttonNine.classList.remove('board__btn--blink');
          setTimeout(() => {buttonNine.classList.add('board__btn--blink');}, 50);
        } else {
          buttonNine.classList.add('board__btn--blink');
        }
    }
    this.index++;
    }
  };

  toggleHighscore = () => {
    this.setState({
      showHighscore: !this.state.showHighscore,
    });
    // If alert is true and highscore has been shown, dont show alert.
    if (this.state.alert && !this.state.showHighscore) {
      this.setState({
        alert: false
      });
    }

  }

  render() {
    if (this.state.isLoading) {
      return <LoadingPage />;
    }

    if (this.state.showHighscore) {
      return (
        <div>

          <Nav
            onClick={this.toggleHighscore}
            title='Back'
          />
          <Highscore
            highscore={this.highscore}
            score={this.state.score}
            newHighScore={this.state.newHighScore}
          />
        </div>
      );
    }

    return (

      <div className="game">

          <div className="score">
            <ul>
              <li className="score__highscore">
                <Nav
                  onClick={this.toggleHighscore}
                  title='Highscore'
                  alert={this.state.alert}
                />
              </li>
              <li className="score__currentScore">Score: {this.state.score}</li>
            </ul>
          </div>

          <div className="board">
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

        <div className="u-center-child">
          <button  className="btn btn--play" onClick={this.startGame} disabled={this.state.disabled}>Play!</button>
        </div>
        <div>


        </div>

      </div>
    );
  }
}

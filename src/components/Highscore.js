import React from 'react';
import ReactDOM from 'react-dom';
import database from '../firebase/firebase';
import LoadingPage from './LoadingPage';
import AddHighscore from './AddHighscore';


export default class Highscore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
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

  checkIfHighscore = (score) => {
    console.log('checkIfHighscore', score);
    if ( (this.highscore[999] === undefined || score >= this.highscore[999].score) && score > 0 ) {
        this.highscoreWorthy = true;
    }
    else {
      this.highscoreWorthy = false;
    }

  };
  render() {
    if (this.state.isLoading) {
      return <LoadingPage />;
    }

    if (this.props.score >= 0) {
      this.checkIfHighscore(this.props.score);
      console.log('this.props.score: ', this.props.score);
    }
    
    const highscoreWorthy = this.highscoreWorthy;
    console.log('highscoreWorthy: ', highscoreWorthy);
    console.log('this.props.score: ', this.props.score);
    return (
      <div>

        <div className="highscore">
          <div className="highscore__header">
            <h1>Highscore:</h1>
          </div>
          <ul className="highscore__list">
            {this.highscore.map((score, index) => {
              return <li key={score.username} className="highscore__list-item">{`${index + 1} . ${score.username} : ${score.score}`}</li>
            })}
          </ul>
        </div>
        <div>
          {highscoreWorthy && <AddHighscore score={this.props.score} highscore={this.highscore} />}
        </div>
      </div>

    );
  }
}

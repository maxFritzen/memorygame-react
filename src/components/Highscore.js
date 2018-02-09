import React from 'react';
import ReactDOM from 'react-dom';
// import database from '../firebase/firebase';
import LoadingPage from './LoadingPage';
import AddHighscore from './AddHighscore';


export default class Highscore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
    // this.highscore = [];
  };

  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   const highscore = [];
  //   return database.ref('highscore').orderByChild('score')
  //     .once('value')
  //     .then((snapshot) => {
  //       snapshot.forEach((childSnapshot) => {
  //         highscore.push({
  //           score: childSnapshot.val().score,
  //           username: childSnapshot.val().username
  //         });
  //       });
  //       highscore.reverse();
  //       this.highscore = highscore;
  //       this.setState({
  //         isLoading: false
  //       });
  //     });
  // };


  // checkIfHighscore = (score) => { // skicka in this.highscore[999] som argument
  //   console.log('checkIfHighscore', score);
  //   if ( (this.highscore[999] === undefined || score >= this.highscore[999].score) && score > 0 ) {
  //       this.highscoreWorthy = true;
  //   }
  //   else {
  //     this.highscoreWorthy = false;
  //   }
  //
  // };
  render() {
    if (this.state.isLoading) {
      return (
        <div className="highscore">
          <LoadingPage />
        </div>

      );
    }

    // if (this.props.score >= 0) {
    //   props.checkIfHighscore(this.highscore[999]);
    // }
    // if (this.props.score >= 0) {
    //   this.checkIfHighscore(this.props.score);
    //   console.log('this.props.score: ', this.props.score);
    // }

    const newHighScore = this.props.newHighScore;
    console.log('newHighScore: ', newHighScore);
    console.log('this.props.score: ', this.props.score);
    console.log('this.props.highscore: ', this.props.highscore);
    return (
        <div className="highscore">
          <div className="highscore__header">
            <h1>Highscore:</h1>
            {newHighScore && <AddHighscore score={this.props.score} highscore={this.props.highscore} />}
          </div>

          <ul className="highscore__list">

            {this.props.highscore.map((object, index) => {
              return <li key={object.username} className="highscore__list-item">{`${index + 1} . ${object.username} : ${object.score}`}</li>
            })}
          </ul>

      </div>

    );
  }
}

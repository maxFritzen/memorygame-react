import React from 'react';
import ReactDOM from 'react-dom';
import database from '../firebase/firebase';
import LoadingPage from './LoadingPage';
import AddHighscore from './AddHighscore';


export default class Highscore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // highscore: [{
      //   score:1,
      //   username:"test"
      // }],
      isLoading: false
    }
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
  //       this.setState({
  //         highscore: highscore,
  //         isLoading: false
  //       });
  //     });
  // };
  render() {
    if (this.state.isLoading) {
      return <LoadingPage />;
    }
    return (
      <div>
        <h1>Highscore:
          {this.props.highscore.map((score, index) => {
            return <li key={score.username}>{`${index + 1} . ${score.username} : ${score.score}`}</li>
          })}
        </h1>
      </div>
    );
  }
}
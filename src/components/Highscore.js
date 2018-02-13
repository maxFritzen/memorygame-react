import React from 'react';
import ReactDOM from 'react-dom';
import database from '../firebase/firebase';
import LoadingPage from './LoadingPage';
import AddHighscore from './AddHighscore';


export default class Highscore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      list: []
    }
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const highscore = [];
    const ref = database.ref('highscore');
    ref.on('child_added', (snapshot) => {
      highscore.push({
        score: snapshot.val().score,
        username: snapshot.val().username
      });
      this.setState({
        list: highscore,
        isLoading: false
      });
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="highscore">
          <LoadingPage />
        </div>
      );
    }

    const highscore = this.state.list;
    // Sort highscore, descending order.
    if (highscore[0]) {
      highscore.sort((a, b) => b.score - a.score);
      // highscore.sort(function(a, b) {
      //   return b.score - a.score;
      // });
    }

    const newHighScore = this.props.newHighScore;

    return (
        <div className="highscore">
          <div className="highscore__header">
            <h1>Highscore:</h1>
            {newHighScore && <AddHighscore score={this.props.score} highscore={this.props.highscore} />}
          </div>

          <ul className="highscore__list">

            {highscore.map((object, index) => {
              return <li key={object.username} className="highscore__list-item">{`${index + 1} . ${object.username} : ${object.score}`}</li>
            })}
          </ul>

      </div>

    );
  }
}

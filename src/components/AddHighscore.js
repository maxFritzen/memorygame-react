import React from 'react';
import ReactDOM from 'react-dom';
import database from '../firebase/firebase';

export default class AddHighscore extends React.Component {
  constructor(props){
    super();
  }
  handleAddScore = (e) => { //e = event
    //e.preventDefault(); // prevents page refresh.
    console.log(e.target.elements.highscore.value);
    const username = e.target.elements.highscore.value;

    database.ref('highscore').push({
      score: this.props.score,
      username: username
    });

  };
  render() {
    return (
      <div>
        <p>You're in the top 100! Add your name below and make history!</p>
        <form className="add-highscore" onSubmit={this.handleAddScore}>
          <input className="add-highscore__input" type="text" name="highscore" placeholder="Enter name" />
          <button className="button">Add!</button>
        </form>
      </div>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import database from '../firebase/firebase';

export default class AddHighscore extends React.Component {
  constructor(props){
    super();
    this.state = {
      usernames: [''],
      validName: true,
      disabled: true,
      error: ''
    };
  }
  componentDidMount() {
    const usernames = this.props.highscore.map((highscore) => {
      return highscore.username;
    });
    this.setState({ usernames: usernames })
  };
  handleAddScore = (e) => { //e = event
    //e.preventDefault(); // prevents page refresh.
    const username = e.target.elements.highscore.value.trim();

    database.ref('highscore').push({
      score: this.props.score,
      username: username
    });
  };
  handleChange = (e) => {
    // this.setState({value: e.target.value});
    const input = e.target.value;
    // const validName = this.state.usernames.indexOf(input) === -1 && input.length > 0;
    // console.log(validName);

    // console.log(input.length);
    if (this.state.usernames.indexOf(input) > -1) {
      this.setState({
        error: 'This name already exists',
        disabled: true,
        validName: false
      });
    } else if (input.length === 0) {
      this.setState({
        error: 'Enter something atleast',
        disabled: true,
        validName: false
      });
    } else {
      this.setState({
        disabled: false,
        validName: true
       });
    }
  };
  render() {

    return (
      <div>
        <p>You're in the top 100, with a score of {this.props.score}! Add your name below and make history!</p>
        <form className="add-highscore" onSubmit={this.handleAddScore}>
          {!this.state.validName && <p style={{color:'red'}}>{this.state.error}</p>}
          <input
            className="add-highscore__input"
            name="highscore"
            placeholder="Enter name"
            maxLength="30"
            onChange={this.handleChange}
          />
          <button className="button" disabled={this.state.disabled}>Add!</button>
        </form>
      </div>
    );
  }
}

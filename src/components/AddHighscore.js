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
      error: '',
      addedUsername: '',
      showForm: true,
      value: ''
    };
  }
  componentDidMount() {
    const usernames = this.props.highscore.map((highscore) => {
      return highscore.username;
    });
    this.setState({ usernames: usernames })
  };
  handleAddScore = (e) => {
    e.preventDefault(); // prevents page refresh.
    const username = e.target.elements.highscore.value.trim();

    database.ref('highscore').push({
      score: this.props.score,
      username: username
    }, this.setState ({
      addedUsername: username,
      showForm: false
    }));
  };
  handleChange = (e) => {
    this.setState({value: e.target.value});
    const input = e.target.value;
    // const validName = this.state.usernames.indexOf(input) === -1 && input.length > 0;

    if (this.state.usernames.indexOf(input) > -1) {
      this.setState({
        error: 'This name already exists',
        disabled: true,
        validName: false
      });
    } else if (input.length === 0) {
      this.setState({
        error: 'Enter something, come on now',
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
    if (!this.state.showForm) {
      return <p>Added name: {this.state.addedUsername}</p>;
    }

    return (
      <div className="add-highscore">
        <p>You're in the top 100, with a score of {this.props.score}! Add your name below and make history!</p>
        <form className="form" onSubmit={this.handleAddScore}>

          <input
            value={this.state.value}
            className="form__input"
            name="highscore"
            placeholder="Enter name"
            maxLength="30"
            onChange={this.handleChange}
          />

          <button className="btn form__submit-button" disabled={this.state.disabled}>Add!</button>
            {!this.state.validName && <p className="form__error-message">{this.state.error}</p>}
        </form>
      </div>
    );
  }
}

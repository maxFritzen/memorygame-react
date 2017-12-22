import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Game from './components/Game';
import database from './firebase/firebase';

const App = () => (
  <div>
    <Game />
  </div>
);



// database.ref('highscore').on('value', snap => console.log(snap.val()));
// database.ref('highscore').child('1').update({
//   score: 20,
//   username: "whambalam"
// });


ReactDOM.render(<App />, document.getElementById('app'));

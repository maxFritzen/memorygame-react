import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import Game from './components/Game';
import database from './firebase/firebase';

const App = () => (
  <div>
    <Game />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

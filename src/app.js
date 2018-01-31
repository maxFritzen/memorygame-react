import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import Game from './components/Game';
import LoadingPage from './components/LoadingPage';
import database from './firebase/firebase';

const App = () => (
  <div>
    <Game />
  </div>
);

let hasRendered = false;
console.log('hasrender', hasRendered);
const renderApp =  () => {
  if (!hasRendered) {
    ReactDOM.render(<App />, document.getElementById('app'));
    hasRendered = true;
    console.log('hasrender', hasRendered);
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));
renderApp();

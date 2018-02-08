import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import database from './firebase/firebase';
import Game from './components/Game';
import LoadingPage from './components/LoadingPage';
import Header from './components/Header';


const App = () => (
  <div className="content-container">
    <Header />
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

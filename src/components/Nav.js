import React from 'react';

const Nav = (props) => (

  <div>
    <p
      onClick={props.onClick}
      className={props.newHighScore ? 'score__highscore score__highscore--highlight' : 'score__highscore'}
      >
      {props.title}
      {props.newHighScore &&
        <span><i className="fa fa-info-circle"></i></span>
      }
    </p>

  </div>
);

export default Nav;

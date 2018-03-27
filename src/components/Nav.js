import React from 'react';

const Nav = (props) => (
  <div>
    {props.alert && // To use an animation when alert is true
      <p
        onClick={props.onClick}
        className={props.alert ? 'score__highscore score__highscore--highlight' : 'score__highscore'}
        >
        {props.title}
        {props.alert &&
          <span><i className="fa fa-info-circle"></i></span>
        }
      </p>
    }
    {!props.alert &&
      <p
        onClick={props.onClick}
        className={props.alert ? 'score__highscore score__highscore--highlight' : 'score__highscore'}
        >
        {props.title}
        {props.alert &&
          <span><i className="fa fa-info-circle"></i></span>
        }
      </p>
    }


  </div>
);

export default Nav;

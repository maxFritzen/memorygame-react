import React from 'react';

export default class Square extends React.Component {
  constructor(props) {
    super();

  }
  render() {
    return (
        <button
          id={this.props.id}
          onClick={this.props.handleClick}
          >{this.props.id}</button>
    )
  }
}

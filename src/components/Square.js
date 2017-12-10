import React from 'react';

export default class Square extends React.Component {
  constructor(props) {
    super();

  }
  render() {
    const id = this.props.id;
    return (
        <button
          id={id}
          onClick={() => this.props.onClick(id)}
          >{this.props.id}</button>
    )
  }
}

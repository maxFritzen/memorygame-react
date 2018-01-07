import React from 'react';
import ReactDOM from 'react-dom';

class Square extends React.Component {
  constructor(props){
    super(props);
  };
  render() {
    return (
      <div>
        <button ref="button" onClick={this.props.onClick} className={this.props.className}>{this.props.className}</button>
      </div>
    );
  }
}

export default class Animation extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
  };
  start = () => {
    console.log('start');
    this.toggleClass();
    console.log(ReactDOM.findDOMNode(this.refs.button));
  };
  toggleClass = () => {
    this.setState({active:!this.state.active});
  };
  render() {
    const className = this.state.active ? 'btn--active' : 'btn';
    return (
      <div>
        <Square className={className} onClick={this.start} />
        <Square className={className} />
        <button ref="button" onClick={this.start}>start</button>
      </div>
    );
  }
}

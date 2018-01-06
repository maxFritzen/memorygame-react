import React from 'react';
import ReactDOM from 'react-dom';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      intervalId: undefined
    };
    this.blinkOrNot = false;
    this.index = 0;
  };
  componentDidUpdate() {
    // console.log('componentDidUpdate square');
    // console.log('pattern:', this.props.pattern);
    // console.log('id:', this.props.id);
    //använd inte setSTate här.
    // const intervalId = setInterval(this.timer, 1000);
    // this.setState({ intervalId: intervalId });
  //   // console.log('blink', this.props.blink, this.props.id);
  //   // if (this.props.blink) {
  //   //   console.log('should blink:', this.props.id);
  //   // }
  //   // for (let i = 0; i < this.props.blink.length; i++) {
  //   //   if (this.props.blink[i] === this.props.id) {
  //   //     console.log('should blink:', this.props.id);
  //   //   }
  //   // }
  // //  this.blink();
  };

  componentWillReceiveProps(nextProps) {
  console.log('componentWillReceiveProps Square', nextProps);
  // console.log('pattern:', nextProps.pattern);
  // console.log('id:' ,nextProps.id);
  this.blinkOrNot = false;
  console.log('this.index:',this.index);
  if (nextProps.pattern[this.index] === nextProps.id){
    //this.setState({active:true}); //setState här funkar
    // this.blinkOrNot = true;
    //Är det här jag ska kalla på blink-funktion då?
    this.setInterval = setInterval(this.blink, 1000);
  }


  // //testa sätt detta i state.
  // if (this.props.startInterval) {
  //   console.log('startInterval:', this.props.startInterval);
  // }
    //this.interval = setInterval(() => this.timer(), 1000);
  };
  componentDidMount() {
  //console.log('componentDidMount square');
    //this.interval = setInterval(() => this.timer(), 1000);
  };
  componentWillUnmount() {
    // console.log('componentWillUnmount');
    // clearInterval(this.interval);
  }
  timer = () => {
    console.log('timer testing');
  };
  // componentWillReceiveProps(nextProps) {
  //   //console.log('componentWillRecieveProps', nextProps);
  //   console.log('componentWillRecieveProps');
  //
  // }
  handleClick = (id) => {
    //this.props.onClick(id);
    this.blink();
    //console.log(ReactDOM.findDOMNode(this.refs.button));
    //this.setState({ active: true }),setTimeout(() => this.setState({active:false}), 1000);
    //this.blink();
  };
  blink = () => {
    console.log('blink square');
    console.log('Should set state to active');
    console.log('index blink:', this.index);
    console.log('ID blink:', this.props.id);
    console.log('pattern blink:', this.props.pattern[this.index]);
    if(this.props.pattern[this.index] === this.props.id){
        this.setState({active:true});
    }
    //this.setState({active:true});

    if (this.props.pattern.length === this.index +1){
      console.log('clearInterval');
      clearInterval(this.setInterval);
      //kalla på resetClass-funktion.

    }
    this.index++;

      // this.blinkOrNot = true;
  };
  render() {
    //console.log('renderered');


  //  this.blink();
    const id = this.props.id;
    const className = this.state.active ? 'btn--active' : 'btn';
    //const className = this.props.blinkOrNot ? 'btn--active' : 'btn';
    //const className = this.blinkOrNot ? 'btn--active' : 'btn';
    return (
        <button
          ref="button"
          id={id}
          onClick={() => this.handleClick(id)}
          className={className}
          >
          {className}
        </button>
    );
  }
}

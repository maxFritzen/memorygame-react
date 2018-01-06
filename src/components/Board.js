import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blinkOrNot: false,
    }
    this.startedInterval = false;
    this.blinkOrNot = false;
    this.index = 0;
  };
  componentWillReceiveProps(nextProps) {
  // console.log('componentWillReceiveProps', nextProps);
  // console.log('componentWillReceiveProps', nextProps.startInterval);
  // //Den här kallas eftersom jag skickar ner onClick
  // if (nextProps.startInterval && this.startedInterval === false && nextProps.patternDone) {
  //   //starta interval här
  //   console.log('startInterval:', nextProps.startInterval);
  //   console.log('startedInterval:', this.startedInterval);
  //   this.interval = setInterval(this.blinkOrNotFunction, 1000);
  //   this.startedInterval = true;
  //   this.index = 0;
  // }
    //this.interval = setInterval(() => this.timer(), 1000);

  };
  componentDidUpdate() {
    //console.log('Board componentDidUpdate');
    //console.log('index:', this.props.blinkingPattern);

  };
  blinkOrNotFunction = () => {
    // console.log('blinkOrNotFunction');
    // console.log(this.index);
    // console.log('pattern-length', this.props.pattern.length);
    // if (this.props.pattern.length === this.index +1) {
    //   console.log('should clear interval', this.interval);
    //
    //   clearInterval(this.interval);
    //   this.startedInterval = false;
    // } else {
    //   this.index++;
    //   console.log(this.index);
    // }

      // if (this.props.pattern[i] === id) {
      //   this.setState({blinkOrNot: true});
      //
      // }

  };
  blink = () => {
    console.log('blink board');
    console.log('Should set state to active');
    console.log('index blink:', this.index);
    this.blinkOrNot = true;

    if (this.props.pattern.length === this.index +1){
      clearInterval(this.setInterval);
      //kalla på resetClass-funktion.

    }
    this.index++;

      // this.blinkOrNot = true;
  };
  testing = () => {
    console.log('testing timing');
    //this.setState({blinkOrNot: false});
  }
  shouldBlink = (id) => {
    console.log('shouldBlink');
    console.log('id:', id);
    if (id === this.props.pattern[0]) {
      this.setState({blinkOrNot: true});
    }
  };
  renderSquare = (id) => {
    //kalla en funktion, shouldBlink(id).
    //Då kan den kolla första index bara. Och det kommer alltid vara true av någon av de här då.då kollas index1, osv.
    //kalla en funktion som resetar klass.
    //pass down prop shouldBlink
    //Får inte använda setState i render!
    //this.shouldBlink(id);

  // //använda blnk in game för interval. Jämför här ifall id och vad blink in game visar är samma, och då ändra blink or not till true.
  //     let blinkOrNot = false;
  //     for(let i = 0; i < this.props.pattern.length; i++){
  //       if (this.props.pattern[i] === id) {
  //         blinkOrNot = true;
  //         // this.timerId = setInterval(() => {
  //         //   blinkOrNot = true;
  //         //   console.log(blinkOrNot);
  //         // }, 1000);
  //         console.log(blinkOrNot);
  //         // blinkOrNot = true;
  //       }
  //
  //     }


  // console.log('this.index:',this.index);
  // if (this.props.pattern[this.index] === id){
  //   //this.setState({active:true}); //setState här funkar
  //   // this.blinkOrNot = true;
  //   //Är det här jag ska kalla på blink-funktion då?
  //   this.setInterval = setInterval(this.blink, 1000);
  // }
    return <Square id={id} onClick={this.props.onClick} pattern={this.props.pattern} blinkOrNot={this.blinkOrNot}/>;
  };
  // renderSquare = (id) => {
  //   let blinkOrNot = false;
  //   for(let i = 0; i < this.props.pattern.length; i++){
  //     if (this.props.pattern[i] === id) {
  //       setInterval(() => console.log('test'), 1000);
  //       // blinkOrNot = true;
  //     }
  //   }
  //   return <Square id={id} onClick={this.props.onClick} blinkPattern={this.props.pattern} blinkOrNot={blinkOrNot}/>;
  // };
  render() {

    return (
      <div>
        <p ref="test" id="walla">testingRef</p>
        <div className="board">
          <div className="board__row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board__row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board__row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}

          </div>
        </div>
        <div>

        </div>
      </div>

    );
  }
}

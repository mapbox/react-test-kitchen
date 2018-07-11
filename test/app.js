import React from 'react';
import ReactDOM from 'react-dom';
import ReactLab from '..';
import componentIndex from './component-index';

class App extends React.Component {
  render() {
    return (
      <ReactLab componentCases={componentIndex} />
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App />, container);

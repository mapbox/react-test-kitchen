import React from "react";
import ReactDOM from "react-dom";
import ReactTestKitchen from ".."; // eslint-disable-line
import componentIndex from "./component-index"; // eslint-disable-line

class App extends React.Component {
  render() {
    return <ReactTestKitchen componentIndex={componentIndex} />;
  }
}

const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<App />, container);
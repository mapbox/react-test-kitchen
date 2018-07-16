import React from "react";

class ScrollToTop extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  render() {
    return null;
  }
}

export default ScrollToTop;

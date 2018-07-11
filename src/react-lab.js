import React from "react";
import PropTypes from "prop-types";
import { Router } from "@reach/router";
import TableOfContents from "./table-of-contents";
import ComponentPage from "./component-page";

class ReactLab extends React.Component {
  render() {
    const { componentCases } = this.props;

    const pages = componentCases.map(item => {
      return <ComponentPage key={item.title} path={item.title} {...item} />;
    });

    const tocEntries = componentCases.map(item => item.title);
    return (
      <Router>
        <TableOfContents path="/" entries={tocEntries} />
        {pages}
      </Router>
    );
  }
}

ReactLab.propTypes = {
  componentCases: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      cases: PropTypes.objectOf(PropTypes.object).isRequired
    })
  )
};

export default ReactLab;

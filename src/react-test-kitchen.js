import React from "react";
import PropTypes from "prop-types";
import { Router } from "@reach/router";
import TableOfContents from "./table-of-contents";
import ComponentPage from "./component-page";

class ReactTestKitchen extends React.Component {
  render() {
    const { componentIndex } = this.props;

    const pages = componentIndex.map(item => {
      return <ComponentPage key={item.title} path={item.title} {...item} />;
    });

    const tocEntries = componentIndex.map(item => item.title);
    return (
      <Router>
        <TableOfContents path="/" entries={tocEntries} />
        {pages}
      </Router>
    );
  }
}

ReactTestKitchen.propTypes = {
  componentIndex: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      cases: PropTypes.objectOf(PropTypes.object).isRequired
    })
  )
};

export default ReactTestKitchen;

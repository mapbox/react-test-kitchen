import React from "react";
import PropTypes from "prop-types";
import { Router } from "@reach/router";
import TableOfContents from "./table-of-contents";
import ComponentPage from "./component-page";

class ReactTestKitchen extends React.Component {
  render() {
    const { componentIndex } = this.props;
    const { basePath } = this.props.basePath;
    const pages = componentIndex.map(item => {
      const itemPath = basePath ? `${basePath}/${item.title}` : item.title;
      return <ComponentPage key={item.title} path={itemPath} {...item} />;
    });

    const tocEntries = componentIndex.map(item => item.title);
    return (
      <div style={{ padding: 24 }}>
        <Router basepath={basePath || "/"}>
          <TableOfContents
            path={basePath || "/"}
            entries={tocEntries}
            title={this.props.projectTitle}
          />
          {pages}
        </Router>
      </div>
    );
  }
}

ReactTestKitchen.propTypes = {
  componentIndex: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      cases: PropTypes.objectOf(PropTypes.object).isRequired
    })
  ),
  projectTitle: PropTypes.string.isRequired,
  basePath: PropTypes.string
};

export default ReactTestKitchen;

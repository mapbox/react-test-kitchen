import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

class TableOfContents extends React.Component {
  render() {
    const { entries } = this.props;

    const entryEls = entries.map(entry => {
      return (
        <div key={entry} style={{ marginBottom: 12 }}>
          <Link to={entry} style={{ color: "#4264fb", textDecoration: "none" }}>
            {entry}
          </Link>
        </div>
      );
    });

    return (
      <div>
        <h1 style={{ margin: "0 0 24px 0", fontWeight: "bold", fontSize: 45 }}>
          React Test Kitchen
        </h1>
        <div>{entryEls}</div>
      </div>
    );
  }
}

TableOfContents.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TableOfContents;

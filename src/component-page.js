import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import ComponentCase from "./component-case";
import ScrollToTop from "./scroll-to-top";

class ComponentPage extends React.Component {
  render() {
    const { title, cases } = this.props;

    const caseEls = Object.keys(cases).map(caseId => {
      const caseInfo = cases[caseId];
      let description = caseInfo.description || caseId;
      if (!/\.$/.test(description)) {
        description += ".";
      }
      return (
        <div key={caseId} style={{ margin: "36px 0" }}>
          <ComponentCase {...caseInfo} description={description} />
        </div>
      );
    });

    return (
      <div>
        <ScrollToTop />
        <div style={{ marginBottom: 12 }}>
          <Link to="/" style={{ color: "#4264fb", textDecoration: "none" }}>
            Back to component list
          </Link>
        </div>
        <h1
          style={{
            margin: "0 0 24px 0",
            fontWeight: "bold",
            fontSize: 35,
            lineHeight: 1
          }}
        >
          {title}
        </h1>
        <div>{caseEls}</div>
      </div>
    );
  }
}

ComponentPage.propTypes = {
  title: PropTypes.string.isRequired,
  cases: PropTypes.objectOf(PropTypes.object).isRequired
};

export default ComponentPage;

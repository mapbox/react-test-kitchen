import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import ComponentCase from './component-case';

class ComponentPage extends React.Component {
  render() {
    const { title, cases } = this.props;

    const caseEls = Object.keys(cases).map(caseId => {
      const caseInfo = cases[caseId];
      return (
        <div key={caseId} style={{ margin: '36px 0' }}>
          <ComponentCase {...caseInfo} />
        </div>
      );
    });

    return (
      <div>
        <h1>{title}</h1>
        <Link to="/">Back to component list</Link>
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

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

class TableOfContents extends React.Component {
  render() {
    const { entries } = this.props;

    const entryEls = entries.map(entry => {
      return (
        <Link to={entry} key={entry}>
          {entry}
        </Link>
      );
    });

    return (
      <div>
        <h1 style={{ marginBottom: 24 }}>Components</h1>
        <div>{entryEls}</div>
      </div>
    );
  }
}

TableOfContents.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TableOfContents;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import ScrollToTop from './scroll-to-top';

class TableOfContents extends React.Component {
  render() {
    const { entries } = this.props;

    const entryEls = entries.map(entry => {
      return (
        <div key={entry} style={{ marginBottom: 12 }}>
          <Link to={entry} style={{ color: '#4264fb', textDecoration: 'none' }}>
            {entry}
          </Link>
        </div>
      );
    });

    return (
      <div>
        <ScrollToTop />
        <h1
          style={{
            margin: '0 0 24px 0',
            fontWeight: 'bold',
            fontSize: 45,
            lineHeight: 1
          }}
        >
          {this.props.title}
        </h1>
        <div>{entryEls}</div>
      </div>
    );
  }
}

TableOfContents.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired
};

export default TableOfContents;

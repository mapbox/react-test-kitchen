import React from 'react';
import PropTypes from 'prop-types';

export default class ChevronousText extends React.PureComponent {
  render() {
    return (
      <span>
        {this.props.text} <span style={{ fontWeight: 'bold' }}>{'>'}</span>
      </span>
    );
  }
}

ChevronousText.propTypes = {
  text: PropTypes.string.isRequired
};

import React from "react";
import PropTypes from "prop-types";

class ComponentCase extends React.Component {
  renderElement() {
    const { element, component, props } = this.props;

    if (element) {
      return element;
    }

    if (!component) {
      throw new Error(
        `Test case does not specify an element or component. Each test case must specify one or the other.`
      );
    }

    const componentToRender = getWrappedComponent(component);

    return React.createElement(componentToRender, props || {});
  }

  render() {
    const { description, containerClasses, containerStyle } = this.props;

    const element = this.renderElement();

    return (
      <div>
        <div style={{ marginBottom: 12 }}>{description}</div>
        <div className={containerClasses} style={containerStyle}>
          <div style={{ border: "1px dashed lightgray" }}>{element}</div>
        </div>
      </div>
    );
  }
}

ComponentCase.propTypes = {
  description: PropTypes.string.isRequired,
  component: PropTypes.func,
  props: PropTypes.object,
  element: PropTypes.node,
  containerClasses: PropTypes.string,
  containerStyle: PropTypes.object
};

function getWrappedComponent(component) {
  if (component.WrappedComponent) {
    return getWrappedComponent(component.WrappedComponent);
  }
  return component;
}

export default ComponentCase;

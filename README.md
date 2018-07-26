# @mapbox/react-test-kitchen

A little laboratory for React component development and testing.

Unlike a lot of solutions out there with similar goals, it is dead simple, and very flexible because of that simplicity.

## Installation

```
npm install @mapbox/react-test-kitchen --save-dev
```

You'll also need to have some peer dependencies installed, if you don't already have them:

```
npm install react react-dom prop-types
```

## About

When developing React components outside of any particular context (e.g. for a cross-project component library), you need a system for rendering and manually testing those components.

When writing automated tests for React components, you need a way to manually verify that the assertions you're making in your tests correspond to *actually* correct appearance and behavior. Whether you're testing render functions (often with snapshots) or interactions, you may end up making erroneous assertions if you haven't *first* performed the same test manually.

React Test Kitchen addresses both of these problems:

- It provides a component you can use to create a web app for developing and manually reviewing your components.
- It provides a pattern for defining test cases that can be shared between the web app and your automated tests.

## Usage

When using React Test Kitchen, **you'll create test cases for your components**. These test cases will be rendered by the `ReactTestKitchen` component and can *also* be used by your unit tests — so **you'll be able to manually verify the test case that you are making assertions about in your tests**.

**You'll set up a web app that uses the `ReactTestKitchen` component.** In order to provide sufficient flexibility without adding a ton of complexity to this library, React Test Kitchen leaves it up to *you* to get the web app running. Maybe you use Browserify transforms and [Budo], or Webpack and [webpack-serve](https://github.com/webpack-contrib/webpack-serve), or Rollup and whatever-dev-server-works-well-with-Rollup. All of the (very minimal) styling for React Test Kitchen's internal components is done with inline styles, so it won't clash with the CSS your components need.

### Define your test cases

Define test cases in JS files with the `-test-cases` suffix. For example, `modal-test-cases.js`.

A test case file should provide a named `testCases` export (either `export { testCases }` or `module.exports = { testCases }`). `testCases` must be an object whose keys are test case IDs and values are [test case objects](#test-case-api).

Example test case file:

```js
import FancyBox from './path/to/fancy-box';
// Or: const FancyBox = require('./path/to/fancy-box');

const testCases = {};

testCases.defaults = {
  description: 'Default props',
  component: FancyBox
};

testCases.bgColor = {
  description: 'Colored background',
  component: FancyBox,
  props: {
    bgColor: 'pink'
  }
};

export { testCases };
// Or: module.exports = { testCases };
```

#### Spying on callbacks

Often you'll want to define a callback that runs in the browser but is a spy for automated tests. You can do this in various ways, depending on your spying library of choice.

One way is to define a `safeSpy` function that uses a spy in the test environment. For example, if you're using Jest you could do something like this:

```js
function safeSpy(browserImplementation) {
  if (typeof jest === 'undefined') {
    return browserImplementation
  }
  return jest.spy();
}

testCases.clickHandler = {
  description: 'With a click handler',
  component: FancyBox,
  props: {
    onClick: safeSpy(() => { console.log('clicked'); })
  }
};
```

Another way is to spy on (and maybe stub) the function before using the test case in a test. For example, you could `sinon.stub(testCases.clickHandler.props, 'onClick')` and go from there.

### Build your component index

React Test Kitchen provides an `rtk-index` CLI that automatically builds an index of all the `**/*-test-cases.js` files it finds. You'll need to pass this index to the `ReactTestKitchen` component.

You'll probably want to define an npm script that invokes this command:

```
"build-component-index": "rtk-index ./src/components ./src/test-cases-app/component-index.js"
```

A couple of things you'll probably want to do:

- Re-build this index every time you start the web app or run your automated tests (it won't take long).
- Add this index to `.gitignore`.

### Render the `ReactTestKitchen` component in your web app

As described above, React Test Kitchen does not provide a complete web app but a component that you'll render within *your* app. That way you can set up the app according to your preferences — referencing your CSS or doing whatever else you need to do.

You'll want to import the `ReactTestKitchen` component from this package and pass it your [component index](#build-your-component-index).

#### Example with [Budo]

Let's say you use [Budo] for your development server, along with [babelify](https://github.com/babel/babelify) for JSX and ES2015 transforms.

You could create a `src/test-cases-app/index.html` file like this:

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Test cases</title>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <link href="https://api.mapbox.com/mapbox-assembly/v0.22.0/assembly.min.css" rel="stylesheet">
  <script async src="https://api.mapbox.com/mapbox-assembly/v0.22.0/assembly.js"></script>
</head>
<body>
  <div id="app"></div>
  <script src="test-cases-app.js"></script>
</body>
</html>
```

Then create a `src/test-cases-app/test-cases-app.js` file like this:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestKitchen from '@mapbox/react-test-kitchen';
import componentIndex from './component-index'; // eslint-disable-line

class TestCasesApp extends React.Component {
  render() {
    return <ReactTestKitchen projectTitle="My components" componentIndex={componentIndex} />;
  }
}

ReactDOM.render(<TestCasesApp />, document.getElementById('app'));
```

Then define an npm script to start it, like this (first rebuilding the component index, as described above):

```
"start": "scripts/build-module-indexes.js && budo ./src/test-cases-app/test-cases-app.js --dir ./src/test-cases-app --live --debug --pushstate -- -t babelify"
```

Now you have a development environment where you can manually review your test cases!

### Write automated tests

You can import the `testCases` you've defined into your automated tests, then render them and make assertions.

How exactly you do this will depend on your preferred test framework and patterns. `testCases` is just an object that provides that information you'll need to run tests against the same component you manually checked in the web app.

*You may have test cases that should be rendered for manual review in the web app but aren't suitable for automated tests.* That's fine: just don't include them in your automated tests.

#### Example with Jest

Let's say you're using [Jest](https://jestjs.io/) and [React Test Renderer](https://reactjs.org/docs/test-renderer.html) to test your components. Here's one pattern for making assertions against the test cases you've defined.

```js
// fancy-box.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { testCases } from './fancy-box-test-cases';

let testCase;
let rendered;

describe(testCases.defaults.description, () => {
  beforeEach(() => {
    testCase = testCases.basic;
    rendered = renderer.create(React.createElement(testCase.component, testCase.props));
  });

  test('renders expected elements', () => {
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});

describe(testCases.bgColor.description, () => {
  beforeEach(() => {
    testCase = testCases.bgColor;
    rendered = renderer.create(React.createElement(testCase.component, testCase.props));
  });

  test('renders expected elements with different background color', () => {
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});

describe(testCases.clickHandler.description, () => {
  beforeEach(() => {
    testCase = testCases.clickHandler;
    rendered = renderer.create(React.createElement(testCase.component, testCase.props));
  });

  test('renders expected elements with different background color', () => {
    rendered.props.onClick();
    expect(testCase.clickHandler).toHaveBeenCalled();
  });
});
```

You could then follow patterns [suggested in the Jest docs](https://jestjs.io/docs/en/tutorial-react) for testing interactions.

## Test case API

A test case is an object with the properties described below.

Most of the time your test cases will include `component` and `props`. For certain situations, typically for display-only cases, you may use the `element` property instead.

### testCase.description

Type: `string`. **Required.**

A prose description of your test case. This will be rendered in the web app and can be used, if you'd like, to describe test blocks.

### testCase.component

Type: React component. Usually you'll provide this: it's required unless you're using `element`.

The React component that you're testing.

### testCase.props

Type: `Object`. Usually you'll provide this — unless you're using `element`.

The props that should be passed to your [`component`] in the test case.

### testCase.element

Type: React *element*. Mutually exclusive with [`component`] and [`props`]. Usually you *won't* provide this, but in some cases it's helpful.

A rendered React element (rendered either with JSX or `React.createElement()`) to use for the test case.

This is useful in situations where you need to wrap the component in some way in order to provide a useful rendering in the web app. For example, a useful rendering of a modal component or a full screen loading spinner usually requires a button that toggles the component: you don't want it to automatically open and block the screen as soon as you land on the page.

However, you don't want to *test* that button in your unit tests. **Because `element` is helpful for creating useful *renderings in the web app*, test cases that use `element` are usually for manually testing only,** not your automated tests.

### testCase.containerClasses

Type: `string`.

CSS classes for the test-case container.

### testCase.containerStyle

Type: `Object`.

A style object for the test-case container.

[`component`]: #testcasecomponent
[`props`]: #testcaseprops
[Budo]: https://github.com/mattdesl/budo

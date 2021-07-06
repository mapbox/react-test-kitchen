import ChevronousText from '../chevronous-text';

const testCases = {};
const noRenderCases = {};

testCases.basic = {
  component: ChevronousText,
  description: 'is this chevronous?',
  props: {
    text: 'Hello'
  }
};

testCases.different = {
  component: ChevronousText,
  description: 'basic but different',
  props: {
    text: 'Different text'
  }
};

noRenderCases.basic = {
  component: ChevronousText,
  description: 'see no evil',
  props: {
    text: 'Hello'
  }
};

export default { testCases, noRenderCases };

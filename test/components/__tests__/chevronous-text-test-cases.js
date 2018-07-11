import ChevronousText from '../chevronous-text';

const cases = {};

cases.basic = {
  component: ChevronousText,
  description: 'just basic',
  props: {
    text: 'Hello'
  }
};

cases.different = {
  component: ChevronousText,
  description: 'basic but different',
  props: {
    text: 'Different text'
  }
};

export default cases;

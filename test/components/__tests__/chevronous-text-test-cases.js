import ChevronousText from "../chevronous-text";

const testCases = {};
const noRenderCases = {};

testCases.basic = {
  component: ChevronousText,
  description: "just basic",
  props: {
    text: "Hello",
  },
};

testCases["Basic, but also different. Special and different"] = {
  component: ChevronousText,
  props: {
    text: "Different text",
  },
};

noRenderCases.basic = {
  component: ChevronousText,
  description: "see no evil",
  props: {
    text: "Hello",
  },
};

export default { testCases, noRenderCases };

"use strict";

const path = require("path");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonJs = require("rollup-plugin-commonjs");
const rollupBabel = require("rollup-plugin-babel");

module.exports = {
  input: path.join(__dirname, "src/react-test-kitchen.js"),
  output: {
    file: path.join(__dirname, "index.js"),
    format: "cjs",
  },
  watch: {
    clearScreen: false,
  },
  external: ["react", "@reach/router", "prop-types"],
  plugins: [
    rollupBabel({
      babelrc: false,
      presets: [["@babel/env", { modules: false }], "@babel/react"],
      exclude: "node_modules/**",
    }),
    nodeResolve(),
    commonJs(),
  ],
};

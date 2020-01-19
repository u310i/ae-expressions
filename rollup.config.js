// import { rollup } from "rollup";
import es3 from "rollup-plugin-es3";

export default {
  input: "./src/index.js",
  output: {
    file: "./dist/main.rollup.bundle.js",
    format: "iife",
    name: "bundle"
  },
  plugins: [es3()]
};

// rollup({
//   input: "./src/index.js",
//   output: {
//     file: "./dist/main.rollup.bundle.js",
//     format: "iife",
//     name: "bundle"
//   },
//   plugins: [es3()]
// });

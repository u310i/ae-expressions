const path = require("path");
const babel = require("rollup-plugin-babel");
// const cleanup = require("rollup-plugin-cleanup");
const rollup = require("rollup");
const glob = require("glob");

const srcDir = "./src";
const distDir = "./dist";

// ./src以下のjsファイルのリストを取得する。ただし_から始まるファイルとmodulesディレクトリは除外する。
const entries = glob.sync("**/*.js", {
  ignore: ["modules/**/*.js", "**/_*/*"],
  cwd: srcDir
});

//リストアップしたjsファイルをバンドルする。
// for (let entry of entries) {
//   const inputOptions = {
//     input: path.resolve(srcDir, entry),
//     plugins: [babel()]
//   };
//   const outputOptions = {
//     format: "iife",
//     file: path.resolve(distDir + "/es3", entry),
//     name: entry.match(".+/(.+?).[a-z]+([?#;].*)?$")[1]
//   };
//   build(inputOptions, outputOptions);
// }

for (let entry of entries) {
  const inputOptions = {
    input: path.resolve(srcDir, entry)
    // plugins: [cleanup()]
  };
  const outputOptions = {
    format: "iife",
    file: path.resolve(distDir, entry),
    name: entry.match(".+/(.+?).[a-z]+([?#;].*)?$")[1]
  };
  build(inputOptions, outputOptions);
}

async function build(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

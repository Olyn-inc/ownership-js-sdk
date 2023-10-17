const fs = require("fs");
const path = require("path");

function main() {
  const source = fs
    .readFileSync(path.join(__dirname, "../package.json"))
    .toString("utf-8");
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};

  if (sourceObj.main.startsWith("dist/")) {
    sourceObj.main = sourceObj.main.slice(5);
  }

  sourceObj.main = sourceObj.main.replace(".dist/", "./");
  sourceObj.types = sourceObj.types.replace(
    ".dist/ownership-sdk.d.ts",
    "./index.d.ts"
  );

  fs.writeFileSync(
    path.join(__dirname, "../dist/package.json"),
    Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8")
  );

  fs.copyFileSync(
    path.join(__dirname, "../.npmignore"),
    path.join(__dirname, "../dist/.npmignore")
  );

  fs.renameSync(
    path.join(__dirname, "../dist/ownership-sdk.d.ts"),
    path.join(__dirname, "../dist/index.d.ts")
  );
}

main();

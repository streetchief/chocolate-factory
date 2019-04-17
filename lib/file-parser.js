"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FileParser;

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var xlsx = _interopRequireWildcard(require("xlsx"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/* File Parsing module */
function FileParser() {
  const getDir = (pathFragment = ``) => path.resolve(pathFragment);

  return {
    fileExists: (pathFragment = ``) => {
      return new Promise((resolve, reject) => {
        fs.access(getDir(pathFragment), fs.constants.F_OK | fs.constants.R_OK, err => {
          if (err) {
            console.log(`${err.code} trying to read file from ${pathFragment}`);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },
    isParseable: (pathFragment = ``) => {
      const resolvedPath = path.resolve(__dirname, pathFragment);
    },
    parseCSV: pathFragment => {
      const data = xlsx.readFile(getDir(pathFragment));
      console.log(Object.keys(data));
    }
  };
}
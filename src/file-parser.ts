import * as path from "path";
import * as fs from "fs";
import * as xlsx from "xlsx";
import { FileParser } from "./index.d";
// const path = require('path');
// const fs = require('fs');
// const xlsx = require('xlsx');

/* File Parsing module */
// module.exports = function FileParserFactory(): FileParser {
export function FileParserFactory(): FileParser {
  const getDir = (pathFragment = ``) => {
    return path.resolve(pathFragment);
  };

  return {
    fileExists: (pathFragment = ``) => {
      return new Promise((resolve, reject) => {
        fs.access(getDir(pathFragment), fs.constants.F_OK | fs.constants.R_OK, err => {
            if (err) {
              console.log(`Error code ${err.code} while trying to read file from ${pathFragment}`);
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    },
    parseCSV: (pathFragment = ``) => {
      try {
        const workbook = xlsx.readFile(getDir(pathFragment));
        const firstSheetName = workbook.SheetNames[0];
        const orderData = workbook.Sheets[firstSheetName];

        /*
            We convert CSV bonus_ratio key here to JS camelCase key
            Range param eliminates header from resulting array or arrays
            header param converts each array into an object using values of header array for keys
        */
        return xlsx.utils.sheet_to_json(orderData, {
          range: 1,
          header: ["type", "cash", "price", "bonusRatio"]
        });
      } catch (e) {
        console.log(`Failed to parse CSV successfully`);
        throw e;
      }
    }
  };
}

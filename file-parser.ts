import * as path from 'path';
import * as fs from 'fs';

/* File Parsing module */
export default function FileParser() {
    // if (!pathFragment) throw new TypeError(`pathFragment is not defined!`);
    
    return {
        fileExists: (pathFragment = ``) => {
            return new Promise((resolve, reject) => {
                const resolvedPath = path.resolve(__dirname, pathFragment);
                
                fs.access(resolvedPath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        },
        isParseable: (pathFragment = ``) => {
            const resolvedPath = path.resolve(__dirname, pathFragment);
        },
        parseCSV: (pathFragment: string) => {},
    };
}
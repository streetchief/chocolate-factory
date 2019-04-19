# Bobby's Chocolates (Stride Code Test)
This is a solution to the Stride Coding Test.

## Requirements
This module requires a version of NodeJS with es2015 support to be installed and available on the PATH, as well as NPM.

## Commands
### Build
1) `npm i` to install all required packages from the NPM package repository.
2) `npm run build` to compile module.

### Run
`npm start` to read an existing CSV in the `input` folder once the module has been build.

### Test
We support testing via Jest.  Run `npm test` to run the all existing test suites.
Jest will compile and run the TypeScript files automatically via Babel.

## Discussion

## Dependencies
- [XLSX](https://docs.sheetjs.com/#json) - Parse CSV files

### Dev dependencies
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Jest](https://jestjs.io/docs/en): Testing framework
- [Babel](https://babeljs.io/): Compile Typescript for Jest tests
- [Rollup](https://rollupjs.org/guide/en) - Import and merge all modules required for build

## Issues/Notes/Optimizations
- TypeScript error in `calculator.ts`
- No ESLint so we are missing some consistency.
- Parsing a csv during testing might be excessively time consuming.
- XLSX supports streams if needed.
- bonusPackQuantity and purchaseQuantity use the same operation.
- Need to add some tests for error handling, esp. in index.ts

## Backlog
- Add ESlint config.
- Add enviromental config support.
- Support fully featured logging with configurations and convert `console` calls to use logger.
- Bonus rules should take a config and build functions instead of functions directly.
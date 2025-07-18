# Chocolate Store Calculator

This is a toy app for a Chocolate Store Calculator.

## Requirements

This module requires a version of NodeJS with es2015 support to be installed and available on the PATH, as well as NPM.

## Commands

### Build

1) `npm i` to install all required packages from the NPM package repository.
2) `npm run build` to compile module.

### Run

`npm start` to read an existing CSV in the `input` folder once the module has been built.

### Test

We support testing via Jest.  Run `npm test` to run the all existing test suites.
Jest will compile and run the TypeScript files automatically via Babel.

## Discussion 

 - Separation of concerns via modules keeps things extensible and reduces mental overhead.  The modules were divided by responsibility.  This division makes refactoring more complicated, but each module's responsibility is quite abstract, with file management in one, and order calculations in another.  Hopefully this provides easy growth and scaling in the future.  
 -  If more extensive logging were required, it would make sense to have a logging module, but at this point it is un-necessary.  
 -  Environmental configuration for the rules, sheet data, etc. are also crucial for a larger app, but add more time in the development phase right now.  Future developers will have to go in and modify code to update and extend business testing; in a larger system, this could require additional deployments. I attempted to make the module scalable in the future by using a configuration, even if only internally.
 - Factory functions with closure provide data encapsulation and reduce issues with using the `this` keyword.  Classes are becoming more popular and widespread now though, so this may be counter productive in a team setting or with an existing codebase.  Consistency and clarity are extremely important to assist other engineers to understand and improve the codebase.  Function naming is hopefully clear and concise.
 - Unfortunately, there is currently no association between orders in and orders out.  No tracking of any funds that go unused.  The simplicity of the system allows for rapid testing, but there is a lot of lost information, and money, directly, or through order confusion.
 
## Dependencies

- [XLSX](https://docs.sheetjs.com/#json) - Parse CSV files into JS objects

### Dev dependencies
- [TypeScript](https://www.typescriptlang.org/) - Type safety, and much, much more.
- [Jest](https://jestjs.io/): Automated testing and coverage framework.
- [Babel](https://babeljs.io/): Compile Typescript for Jest tests
- [Rollup](https://rollupjs.org/guide/en) - Import and merge all modules required for building a single file module.

## Issues

- TypeScript error in `calculator.ts`, but it should not cause application errors.
- No ESLint so we are missing some consistency in spacing, string identifiers, etc.
- Parsing a CSV is an order of magnitude longer than most of the other tests, and might be excessively long, especially with a larger file.

## Notes/Optimizations

- XLSX supports streams if needed for future optimizations; batching is also a possibility.
- bonusPackQuantity and purchaseQuantity use the same operation, could be abstracted.

## Backlog

- Add ESlint config.
- Add environmental config support.
- Support fully featured logging with configurations and convert `console` calls to use logger.
- Bonus rules should take a config and build functions instead of functions directly.
- File Parser could take config for path and sheet headers.
- Need to add some tests for error handling, esp. in index.ts

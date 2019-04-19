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
 - Separation of concerns via modules keeps things extensible and reduce mental overhead.  The modules were divided by responsibility.  This complexity makes refactoring more complicated, but each module's responsibility is quite large and abstract, with file management in one, and order calculations in another.  Hopefully this provides easy growth and scaling in the future.  
 -  If more extensive logging were required, it would make sense to have a logging module, but at this point it is un-necessary.  
 -  Environmental configuration for the rules, sheet data, etc. are also somewhat crucial for a larger app, but somewhat add more time right now.  Future developers will have to go in an modify code to update and extend business testing; in a larger system, this could require additional deployments. I attempted to make the module scalable in the future by using a configuration, even if only internally.
 - Factory functions with closure provide data encapsulation and reduce issues with using the `this` keyword.  Classes are becoming more popular and widespread now though, so this may be counter productive in a team setting.  Consistency and clarity are extremely important to assist other engineers understand and improve the codebase.
 - No association between orders in and orders out.  No tracking of any funds that go unused.  The simplicity of the system allows for rapid testing, but there is a lot of information, and possibly actual money lost.
 
## Dependencies
- [XLSX](https://docs.sheetjs.com/#json) - Parse CSV files

### Dev dependencies
- [TypeScript](https://www.typescriptlang.org/) - Type safety, and much, much more.
- [Jest](https://jestjs.io/docs/en): Automated testing and coverage framework.
- [Babel](https://babeljs.io/): Compile Typescript for Jest tests
- [Rollup](https://rollupjs.org/guide/en) - Import and merge all modules required for building a single file module.

## Issues/Notes/Optimizations
- TypeScript error in `calculator.ts`
- No ESLint so we are missing some consistency in spacing, string identifiers, etc.
- Parsing a CSV during testing might be excessively time consuming.
- XLSX supports streams if needed for future optimizations
- bonusPackQuantity and purchaseQuantity use the same operation, could be abstracted.
- Need to add some tests for error handling, esp. in index.ts

## Backlog
- Add ESlint config.
- Add environmental config support.
- Support fully featured logging with configurations and convert `console` calls to use logger.
- Bonus rules should take a config and build functions instead of functions directly.

## Final Thoughts
Thanks!
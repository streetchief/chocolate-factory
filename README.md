# stride-cc
Stride Coding Challenge

## Dependencies
- [Jest](https://jestjs.io/docs/en): Testing framework.  I have not previously used Jest, but it is a modern framework popular for testing React.
- [Babel](https://babeljs.io/): Compile Typescript for Jest tests
- [XLSX](https://docs.sheetjs.com/#json) - Parse CSV files 

## Issues
- getDir in FileParse is brittle
- Parsing a csv during testing might be excessively time consuming

## Notes
- XLSX supports streaming if we wanted to use streams
- bonusPackQuantity and purchaseQuantity use the same operation

## Backlog
- Add enviromental config support
- Support fully featured logging with configurations
    - convert `console` calls to use logger
- Bonus rules should take a config and build functions instead of functions directly
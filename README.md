# stride-cc
Stride Coding Challenge

## Dependencies
- Jest: Testing framework.  I have not previously used Jest, but it is a modern framework popular for testing React.
- Babel: Compile Typescript and target current node version.
- XLSX - Parse CSV files

## Issues
- getDir in FileParse is brittle
- Parsing a csv during testing might be excessively time consuming

# Notes
- XLSX supports streaming if we wanted to use streams

## Backlog
- Add enviromental config support
- Support fully featured logging with configurations
    - convert `console` calls to use logger
- Bonus rules should take a config and build functions instead of functions directly
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OrderProcessor;

// Import Types

/* Factory function to instantiate and Order Processing object */
function OrderProcessor(options) {
  const defaults = {
    chocolateTypes: {
      milk: 'milk',
      dark: 'dark',
      white: 'white'
    },
    bonusRules: {
      milk: c => ({}),
      dark: c => ({}),
      white: c => ({})
    },
    orderPath: 'input/orders.csv',
    outputProcessing: () => {}
  }; // TODO: Switch to lodash extend or some method to avoid overwriting references in the options object.

  const config = Object.assign({}, defaults, options);
  return {
    processOrders: () => {// parse file
      // calculate order
      // output results
    }
  };
}
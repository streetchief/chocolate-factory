import { Options, ChocolateCounts, } from './index.d';

/* Factory function to instantiate and Order Processing object */
export default function OrderProcessor(options: Options) {
    const defaults: Options = {
        chocolateTypes: {
            milk: 'milk',
            dark: 'dark',
            white: 'white',
        },
        bonusRules: {
            milk: (c: ChocolateCounts) => ({}),
            dark: (c: ChocolateCounts) => ({}),
            white: (c: ChocolateCounts) => ({}),
        },
        orderPath: 'input/orders.csv',
        outputProcessing: () => {},
    };
    
    // TODO: Switch to lodash extend or some method to avoid overwriting references in the options object.
    const config: Options = Object.assign({}, defaults, options);
    
    return {
        processOrders: () => {
            // parse file
            // calculate order
            // output results
        },
    };
}

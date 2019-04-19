import { Options, ChocolateCounts, } from './index.d';
import { FileParserFactory } from './file-parser';

// OrderProcessor().processOrders();

/* Factory function to instantiate an Order Processing object */
export function OrderProcessor(options?: Options) {
    const defaults: Options = {
        chocolateTypes: {
            milk: 'milk',
            dark: 'dark',
            white: 'white',
        },
        bonusRules: {
            milk: (c: number) => ({}),
            dark: (c: number) => ({}),
            white: (c: number) => ({}),
        },
        orderPath: 'input/orders.csv',
        outputProcessing: () => {},
    };
    
    const config: Options = Object.assign({}, defaults, options);
    const FileParser = FileParserFactory();
    
    return {
        processOrders: async () => {
            try {
                await FileParser.fileExists(config.orderPath);
                const orders = FileParser.parseCSV(config.orderPath);
                // calculate order
                // output results
            } catch (e) {
                console.log(`Error calculating orders with bonuses`);
                console.log(`Message: ${e.message}`);
            }
        },
    };
}

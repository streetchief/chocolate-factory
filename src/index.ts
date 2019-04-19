import { Options, ChocolateCounts, } from './index.d';
import { FileParserFactory } from './file-parser';

// OrderProcessor().processOrders();

/* Factory function to instantiate an Order Processing object */
// module.exports = function OrderProcessor(options?: Options) {
export function OrderProcessor(options?: Options) {
    const defaults: Options = {
        chocolateTypes: {
            milk: 'milk',
            dark: 'dark',
            white: 'white',
        },
        bonusRules: {
            milk: (packs: number, counter: ChocolateCounts) => {
                counter.milk += packs;
                return counter;
            },
            dark: (packs: number, counter: ChocolateCounts) => {
                counter.dark += (packs * 2);
                return counter;
            },
            white: (packs: number, counter: ChocolateCounts) => {
                counter.white += packs;
                counter.milk += packs;
                return counter;
            },
        },
        orderPath: 'input/orders.csv',
        outputProcessing: () => {},
    };
    
    const config: Options = Object.assign({}, defaults, options);
    const FileParser = FileParserFactory();
    
    return {
        processOrders: async () => {
            console.log('Processing orders...');
            try {
                await FileParser.fileExists(config.orderPath);
                const orders = FileParser.parseCSV(config.orderPath);
                console.log('order', orders)
                // calculate order
                // output results
            } catch (e) {
                console.log(`Error calculating orders with bonuses`);
                console.log(`Message: ${e.message}`);
            }
        },
    };
}

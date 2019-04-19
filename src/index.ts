import { Options, ChocolateCounts, } from './index.d';
import FileParserFactory from './file-parser';
import CalculatorFactory from './calculator';

/* Factory function to instantiate an Order Processing object */
export default function OrderProcessor(options?: Options) {
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
    };
    
    const config: Options = Object.assign({}, defaults, options);
    const fileParser = FileParserFactory();
    const calculator = CalculatorFactory({ 
        chocolateTypes: config.chocolateTypes,
        bonusRules: config.bonusRules,
    });
    
    return {
        processOrders: async () => {
            try {
                await fileParser.fileExists(config.orderPath);
                const orders = fileParser.parseCSV(config.orderPath);
                if (orders.length === 0) {
                    console.log(`No orders parsed from file`);
                    return;
                }
                
                const successfulOrders = calculator.calculateAllOrders(orders);
                if (successfulOrders.length === 0) {
                    console.log(`No successful orders created`);
                    return;
                }
                
                successfulOrders.forEach(order => {
                    console.log(`milk ${order.milk},dark ${order.dark},white ${order.white}`);
                });
            } catch (e) {
                console.log(`Error calculating orders, exiting...`);
                console.log(`Message: ${e.message}`);
            }
        },
    };
}

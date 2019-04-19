import { 
    BonusCalculator,
    Calculator,
    CalculatorConfig,
    ChocolateCounts,
    CustomerOrder, 
} from "./index.d";

export function CalculatorFactory(config: CalculatorConfig): Calculator {
    if (!config) throw new TypeError(`CalculatorFactory config was undefined`);
    
    return {
        haveOrders: (orders: CustomerOrder[]) => Array.isArray(orders) && orders.length > 0,
        isValidChocolateType: (type: string) => !!config.chocolateTypes[type],
        isSafeInt: (int: number) => Number.isSafeInteger(int) && int > 0,
        purchaseQuantity: (price: number, cost: number) => Math.floor(price / cost),
        bonusPackQuantity: (choclates: number, ratio: number) => Math.floor(choclates / ratio),
        getChocolateCounter: () => {
            return Object.keys(config.chocolateTypes).reduce((counter, type) => {
                counter[type] = 0;
                return counter;
            }, {});
        },
        calculateBonusChocolates: (type: string, purchased: number, rule: BonusCalculator) => {
            const bonusRule = config.bonusRules[type];
            return bonusRule(purchased);
        },
    };
}

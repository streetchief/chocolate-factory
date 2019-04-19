import { 
    BonusCalculator,
    Calculator,
    CalculatorConfig,
    ChocolateCounts,
    CustomerOrder, 
} from "./index.d";

// module.exports = function CalculatorFactory(config: CalculatorConfig): Calculator {
export function CalculatorFactory(config: CalculatorConfig): Calculator {
    if (!config) throw new TypeError(`CalculatorFactory config was undefined`);
    const getChocolateCounter = () => {
        return Object.keys(config.chocolateTypes).reduce((counter, type) => {
            counter[type] = 0;
            return counter;
        }, {});
    };
    
    return {
        getChocolateCounter,
        haveOrders: (orders) => Array.isArray(orders) && orders.length > 0,
        isValidChocolateType: (type) => !!config.chocolateTypes[type],
        isSafeInt: (int) => Number.isSafeInteger(int) && int > 0,
        purchaseQuantity: (price, cost) => Math.floor(price / cost),
        bonusPackQuantity: (choclates, ratio) => Math.floor(choclates / ratio),
        calculateBonusChocolates: (type, packs) => {
            const bonusRule = config.bonusRules[type];
            return bonusRule(packs, getChocolateCounter());
        },
        calculateOrderWithBonus: () => {
            
        },
    };
}

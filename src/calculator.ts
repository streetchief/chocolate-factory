import { 
    Calculator,
    CalculatorConfig,
    ChocolateCounts,
} from "./index.d";

// module.exports = function CalculatorFactory(config: CalculatorConfig): Calculator {
export default function CalculatorFactory(config: CalculatorConfig): Calculator {
    if (!config) throw new TypeError(`CalculatorFactory config was undefined`);
    
    const calc: Calculator = {
        getChocolateCounter: () => {
            return Object.keys(config.chocolateTypes).reduce((counter, type) => {
                counter[type] = 0;
                return counter;
            }, {} as ChocolateCounts);
        },
        haveOrders: (orders) => Array.isArray(orders) && orders.length > 0,
        isValidChocolateType: (type) => !!config.chocolateTypes[type],
        isUseableInt: (int) => Number.isSafeInteger(int) && int > 0,
        purchaseQuantity: (price, cost) => Math.floor(price / cost),
        bonusPackQuantity: (choclates, ratio) => Math.floor(choclates / ratio),
        calculateBonusChocolates: (type, packs) => {
            const bonusRule = config.bonusRules[type];
            return bonusRule(packs, calc.getChocolateCounter());
        },
        calculateOrderWithBonus: (type, purchaseCount, bonusCounts = calc.getChocolateCounter()) => {
            bonusCounts[type] += purchaseCount;
            return bonusCounts;
        },
        calculateAllOrders: (orders) => {
            if (!Array.isArray(orders) || orders.length === 0) return [];
            return orders.reduce((all, order) => {
                if (
                    !calc.isValidChocolateType(order.type)
                    || !calc.isUseableInt(order.cash) // paid zero (or negative)
                    || !calc.isUseableInt(order.price) // chocolate cost 0 (or less)
                ) {
                    return all;
                }
                
                const purchasedQuantity = calc.purchaseQuantity(order.cash, order.price);
                
                // Assuming ratio below 1 means no bonuses
                let bonusChocolates: ChocolateCounts;
                if (calc.isUseableInt(order.bonusRatio)) {
                    const bonusPacks = calc.bonusPackQuantity(purchasedQuantity, order.bonusRatio);
                    bonusChocolates = calc.calculateBonusChocolates(order.type, bonusPacks);
                }
                
                all.push(calc.calculateOrderWithBonus(order.type, purchasedQuantity, bonusChocolates));
                return all;
            }, []);
        },
    };
    
    return calc;
}

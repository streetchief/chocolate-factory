export interface FileParser {
    fileExists(pathFragment: string): Promise<Error>;
    parseCSV(pathFragment: string): CustomerOrder[];
}

export interface CalculatorConfig {
    chocolateTypes: {
        [type: string]: string;
    },
    bonusRules: {
        [type: string]: BonusCalculator,
    },
}

export interface Calculator {
    haveOrders(orders: CustomerOrder[]): boolean;
    isValidChocolateType(type: string): boolean;
    isSafeInt(int: number): boolean;
    purchaseQuantity(cash: number, costPerChocolate: number): number;
    bonusPackQuantity(choclates: number, ratio: number): number;
    getChocolateCounter(): ChocolateCounts;
    calculateBonusChocolates(type: string, purchased: number, rule: BonusCalculator): ChocolateCounts
    calculateOrderWithBonus(order: CustomerOrder): ChocolateCounts;
}

/* Order Processing configuration object */
export interface Options {
    chocolateTypes: {
        [type: string]: string;
    },
    bonusRules: {
        [type: string]: BonusCalculator,
    },
    orderPath: string,
    outputProcessing(): any,
}

type BonusCalculator = (c: ChocolateCounts) => ChocolateCounts;

/* Custom order parsed from a CSV */
export interface CustomerOrder {
    type: string,
    cash: number,
    price: number,
    bonusRatio: number,
}

/* Map of chocolate types to their counts for a final order */
export interface ChocolateCounts {
    [type: string]: number;
}

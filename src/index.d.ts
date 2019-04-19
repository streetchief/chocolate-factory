export interface FileParser {
    fileExists(pathFragment: string): Promise<Error>;
    parseCSV(pathFragment: string): CustomerOrder[];
}

export interface CalculatorConfig {
    chocolateTypes: ChocolateTypes;
    bonusRules: {
        [type: string]: BonusCalculator;
    };
}

export interface ChocolateTypes {
    [type: string]: string;
}

export interface Calculator {
    haveOrders(orders: CustomerOrder[]): boolean;
    isValidChocolateType(type: string): boolean;
    isSafeInt(int: number): boolean;
    purchaseQuantity(cash: number, costPerChocolate: number): number;
    bonusPackQuantity(choclates: number, ratio: number): number;
    getChocolateCounter(): ChocolateCounts;
    calculateBonusChocolates(type: keyof ChocolateTypes, purchased: number): ChocolateCounts;
    calculateOrderWithBonus(type: keyof ChocolateTypes, purchaseQuantity: number, bonuses: ChocolateCounts): ChocolateCounts;
}

/* Order Processing configuration object */
export interface Options {
    chocolateTypes: ChocolateTypes;
    bonusRules: {
        [type: string]: BonusCalculator;
    };
    orderPath: string;
    outputProcessing(): any;
}

type BonusCalculator = (n: number, c: ChocolateCounts) => ChocolateCounts;

/* Custom order parsed from a CSV */
export interface CustomerOrder {
    type: string,
    cash: number,
    price: number,
    bonusRatio: number,
}

/* Map of chocolate types to their counts for a final order */
export type ChocolateCounts = {
    [type in keyof ChocolateTypes]: number;
}

// File Parser object created from factory
export interface FileParser {
    fileExists(pathFragment: string): Promise<Error>;
    parseCSV(pathFragment: string): CustomerOrder[];
}

// Configuration required for Calculator
export interface CalculatorConfig {
    chocolateTypes: ChocolateTypes;
    bonusRules: {
        [type: string]: BonusCalculator;
    };
}

// Map of valid chocolate types with key === value
export interface ChocolateTypes {
    [type: string]: string;
}

// Calculator object created from factory
export interface Calculator {
    haveOrders(orders: CustomerOrder[]): boolean;
    isValidChocolateType(type: string): boolean;
    isUseableInt(int: number): boolean;
    purchaseQuantity(cash: number, costPerChocolate: number): number;
    bonusPackQuantity(choclates: number, ratio: number): number;
    getChocolateCounter(): ChocolateCounts;
    calculateBonusChocolates(type: keyof ChocolateTypes, purchased: number): ChocolateCounts;
    calculateOrderWithBonus(type: keyof ChocolateTypes, purchaseQuantity: number, bonuses?: ChocolateCounts): ChocolateCounts;
    calculateAllOrders(orders: CustomerOrder[]): ChocolateCounts[];
}

/* Order Processing configuration object */
export interface Options {
    chocolateTypes: ChocolateTypes;
    bonusRules: {
        [type: string]: (n: number, c: ChocolateCounts) => ChocolateCounts;
    };
    // relative path of input file
    orderPath: string;
}

type BonusCalculator = (n: number, c: ChocolateCounts) => ChocolateCounts;

/* Custom order parsed from a CSV */
export interface CustomerOrder {
    // Type of Choclate
    type: string,
    // Cash paid by customer
    cash: number,
    // Price per chocolate
    price: number,
    // Ratio for bonus pack
    bonusRatio: number,
}

/* Map of chocolate types to their counts for a final order */
export type ChocolateCounts = {
    [type in keyof ChocolateTypes]: number;
}

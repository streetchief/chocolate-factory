export interface FileParser {
    fileExists(pathFragment: string): Promise<Error>;
    parseCSV(pathFragment: string): CustomerOrder[];
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

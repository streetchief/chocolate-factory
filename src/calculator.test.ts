import CalculatorFactory from "./calculator";
import {
  CalculatorConfig,
  Calculator,
  CustomerOrder,
  ChocolateCounts
} from "./index.d";

let calculator: Calculator;
let config: CalculatorConfig;

beforeAll(() => {
  config = {
    chocolateTypes: {
      milk: "milk",
      dark: "dark",
      white: "white",
      strawberry: "strawberry"
    },
    bonusRules: {
      strawberry: (packs, counter) => {
        counter.strawberry += packs * 3;
        return counter;
      },
      milk: (packs: number, counter: ChocolateCounts) => {
        counter.milk += packs;
        return counter;
      },
      dark: (packs: number, counter: ChocolateCounts) => {
        counter.dark += packs * 2;
        return counter;
      },
      white: (packs: number, counter: ChocolateCounts) => {
        counter.white += packs;
        counter.milk += packs;
        return counter;
      }
    }
  };

  calculator = CalculatorFactory(config);
});

describe("The calculator module", () => {
  it("should have a working factory function", () => {
    expect(CalculatorFactory).toBeDefined();
    expect(CalculatorFactory).toThrow();
    expect(typeof CalculatorFactory(config)).toEqual("object");
  });

  describe("should have validator functions to", () => {
    it("check if there are orders", () => {
      expect(typeof calculator.haveOrders).toBe("function");
      expect(calculator.haveOrders.length).toEqual(1);
      expect(calculator.haveOrders([])).toBe(false);
      expect(calculator.haveOrders([{} as CustomerOrder])).toBe(true);
    });

    it("check if a given chocolate type is valid", () => {
      expect(typeof calculator.isValidChocolateType).toBe("function");
      expect(calculator.isValidChocolateType.length).toEqual(1);
      const supportsConfiguredTypes = Object.keys(config.chocolateTypes)
        .every(calculator.isValidChocolateType);
      expect(supportsConfiguredTypes).toBe(true);
      expect(calculator.isValidChocolateType("definitely-not-a-chocolate")).toBe(false);
    });

    it("check an integer is safe for transaction calculations", () => {
      expect(typeof calculator.isUseableInt).toBe("function");
      expect(calculator.isUseableInt.length).toEqual(1);
      expect(calculator.isUseableInt(-1)).toBe(false);
      expect(calculator.isUseableInt(NaN)).toBe(false);
      expect(calculator.isUseableInt(Number.POSITIVE_INFINITY)).toBe(false);
      expect(calculator.isUseableInt(0)).toBe(false);
      expect(calculator.isUseableInt(1000)).toBe(true);
    });
  });

  it("should be able to calculate chocolates purchased", () => {
    expect(typeof calculator.purchaseQuantity).toBe("function");
    expect(calculator.purchaseQuantity.length).toEqual(2);
    expect(calculator.purchaseQuantity(8, 4)).toEqual(2);
    expect(calculator.purchaseQuantity(8, 5)).toEqual(1);
    expect(calculator.purchaseQuantity(4, 10)).toEqual(0);
  });

  it("should calculate a number of bonus packs", () => {
    expect(typeof calculator.bonusPackQuantity).toBe("function");
    expect(calculator.bonusPackQuantity.length).toEqual(2);
    expect(calculator.bonusPackQuantity(8, 4)).toEqual(2);
    expect(calculator.bonusPackQuantity(8, 5)).toEqual(1);
    expect(calculator.bonusPackQuantity(8, 9)).toEqual(0);
  });

  describe("the function to get a chocolate counter object", () => {
    it(`should create an object`, () => {
      expect(typeof calculator.getChocolateCounter).toBe("function");
      expect(calculator.getChocolateCounter.length).toEqual(0);
      expect(typeof calculator.getChocolateCounter()).toBe("object");
    });

    it("should have the same chocolate types as the configuration", () => {
      const counter = calculator.getChocolateCounter();
      const haveConfigKeys = Object.keys(config.chocolateTypes)
        .every(Object.prototype.hasOwnProperty.bind(counter));
      expect(haveConfigKeys).toEqual(true);
    });

    it(`should set all values to zero`, () => {
      const counter = calculator.getChocolateCounter();
      const allValuesZero = Object.keys(counter).every(k => counter[k] === 0);
      expect(allValuesZero).toBe(true);
    });
  });

  it("should calculate the total number of chocolates based on the bonus packs", () => {
    expect(typeof calculator.calculateBonusChocolates).toBe("function");
    expect(calculator.calculateBonusChocolates.length).toEqual(2);
    const bonuses = calculator.calculateBonusChocolates("strawberry", 2);
    expect(bonuses.strawberry).toEqual(6);
  });

  it(`should calculate a total number of chocolates`, () => {
    expect(typeof calculator.calculateOrderWithBonus).toBe("function");
    const bonusCounter = { strawberry: 5 };
    const totalCount = calculator.calculateOrderWithBonus(
      "strawberry",
      2,
      bonusCounter
    );
    
    expect(totalCount.strawberry).toEqual(7);
  });

  it(`should calculate all orders`, () => {
    expect(typeof calculator.calculateAllOrders).toBe("function");
    delete config.chocolateTypes.strawberry;
    const orders = [
      { type: "milk", cash: 12, price: 2, bonusRatio: 5 },
      { type: "dark", cash: 13, price: 4, bonusRatio: 1 },
      { type: "white", cash: 6, price: 2, bonusRatio: 2 }
    ];
    
    const processed = calculator.calculateAllOrders(orders);
    expect(processed.length).toEqual(3);
    const firstOrder = processed[0];
    expect(firstOrder.milk).toEqual(7);
    expect(firstOrder.dark).toEqual(0);
    expect(firstOrder.white).toEqual(0);
  });
});

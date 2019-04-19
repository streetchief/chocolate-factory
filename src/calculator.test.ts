import { CalculatorFactory } from "./calculator";
import { 
  BonusCalculator,
  CalculatorConfig, 
  Calculator, 
  CustomerOrder,
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
        counter.strawberry += (packs * 3);
        return counter
      },
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
      const supportsConfiguredTypes = Object.keys(config.chocolateTypes).every(
        calculator.isValidChocolateType
      );

      expect(supportsConfiguredTypes).toBe(true);
      expect(
        calculator.isValidChocolateType("definitely-not-a-chocolate")
      ).toBe(false);
    });

    it("check an integer is safe for transaction calculations", () => {
      expect(typeof calculator.isSafeInt).toBe("function");
      expect(calculator.isSafeInt.length).toEqual(1);
      expect(calculator.isSafeInt(-1)).toBe(false);
      expect(calculator.isSafeInt(NaN)).toBe(false);
      expect(calculator.isSafeInt(Number.POSITIVE_INFINITY)).toBe(false);
      expect(calculator.isSafeInt(0)).toBe(false);
      expect(calculator.isSafeInt(1000)).toBe(true);
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
      const haveConfigKeys = Object.keys(config.chocolateTypes).every(
        Object.prototype.hasOwnProperty.bind(counter)
      );
      expect(haveConfigKeys).toEqual(true);
    });

    it(`should set all values to zero`, () => {
      const counter = calculator.getChocolateCounter();
      const allValuesZero = Object.keys(counter).every(k => counter[k] === 0);
      expect(allValuesZero).toBe(true);
    });
  });

    it('should calculate the total number of chocolates based on the bonus packs', () => {
      expect(typeof calculator.calculateBonusChocolates).toBe('function');
      expect(calculator.calculateBonusChocolates.length).toEqual(2);     
      const bonuses = calculator.calculateBonusChocolates('strawberry', 2);
      expect(bonuses.strawberry).toEqual(6);
    });
});

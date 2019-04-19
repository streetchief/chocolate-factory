import FileParserFactory from "./file-parser";
import { FileParser } from './index.d';

describe("File Parser module", () => {
  it("should be a factory function", () => {
    expect(FileParserFactory).toBeDefined();
    expect(typeof FileParserFactory).toEqual("function");
    expect(FileParserFactory).not.toThrow();
  });

  describe(`its methods`, () => {
    let parser: FileParser;
    const orders1SamplePath = `samples/orders_1_mac.csv`;

    beforeAll(() => {
      parser = FileParserFactory();
    });

    describe("file checking validator", () => {
      it(`should exist`, () => {
        expect(typeof parser.fileExists).toEqual(`function`);
      });

      it("should have file checking validator", async () => {
        expect.assertions(1);
        const noError = await parser.fileExists(orders1SamplePath);
        expect(noError).toBeUndefined();
      });

      it(`should error with a non-existant file`, async () => {
        expect.assertions(1);
        await expect(parser.fileExists(`samples/not-here`)).rejects.toThrow();
      });
    });

    describe(`parser`, () => {
      it("should be able to parse CSV files", () => {
        expect(typeof parser.parseCSV).toEqual("function");
        const orders = parser.parseCSV(orders1SamplePath);
        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toEqual(3);
        const firstOrder = orders[0];
        expect(firstOrder.type).toBe('milk');
        expect(firstOrder.cash).toEqual(12);
        expect(firstOrder.price).toEqual(2);
        expect(firstOrder.bonusRatio).toEqual(5);
      });
    });
  });
});

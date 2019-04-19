import { FileParserFactory } from "./file-parser";

describe("File Parser module", () => {
  it("should be a factory function", () => {
    expect(FileParserFactory).toBeDefined();
    expect(typeof FileParserFactory).toEqual("function");
    expect(FileParserFactory).not.toThrow();
  });

  describe(`its methods`, () => {
    let parser;
    const samplePath = `samples/orders_1_mac.csv`;

    beforeAll(() => {
      parser = FileParserFactory();
    });

    describe("file checking validator", () => {
      it(`should exist`, () => {
        expect(typeof parser.fileExists).toEqual(`function`);
      });

      it("should have file checking validator", async () => {
        expect.assertions(1);
        const noError = await parser.fileExists(samplePath);
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
        const orders = parser.parseCSV(samplePath);
        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toEqual(3);
      });
    });
  });
});

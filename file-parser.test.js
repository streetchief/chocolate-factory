import FileParser from "./file-parser";

describe("File Parser module", () => {
  it("should be a factory function", () => {
    expect(FileParser).toBeDefined();
    expect(typeof FileParser).toEqual("function");
    expect(FileParser).not.toThrow();
  });

  describe(`its methods`, () => {
    let parser;
    const samplePath = `samples/orders_1_mac.csv`;

    beforeAll(() => {
      parser = FileParser();
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

    xit("should have a validator to check if xlsx can parse the file", () => {
      expect(typeof parser.isParseable).toEqual("function");
    });

    xit("should have a parse function", () => {
      expect(typeof parser.parseCSV).toEqual("function");
    });
  });
});

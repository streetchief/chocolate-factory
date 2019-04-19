"use strict";
import OrderProcessor from './index';

describe("Order Processor module", () => {
  it("should be a function that takes an options object", () => {
    expect(OrderProcessor).toBeDefined();
    expect(typeof OrderProcessor).toEqual("function");
    expect(OrderProcessor.length).toEqual(1);
    expect(OrderProcessor).not.toThrow();
  });

  it("should provide a process orders method", () => {
    expect(typeof OrderProcessor().processOrders).toEqual("function");
  });
});

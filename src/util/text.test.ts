import { spaces } from "./text";

describe("util/text - textual utility functions", () => {
  describe("spaces", () => {
    it("should be a callable function", () => {
      expect(spaces(1)).not.toThrowError();
    });

    it("should return a string with the same length as the supplied count argument", () => {
      expect(spaces(5).length).toEqual(5);
      expect(spaces(100).length).toEqual(100);
    });

    it.each([1, 2, 3, 4, 5, 100, 1000, 3912])(
      "should return a string with %i number of spaces",
      (n) => {
        const result = spaces(n);

        expect(result.length).toEqual(n);
        expect(result.trim().length).toEqual(0);
      }
    );

    it("should return a string with specified number of spaces", () => {});
  });
});

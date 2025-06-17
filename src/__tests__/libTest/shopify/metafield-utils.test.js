import {
  getMetafieldValue,
  getReferencedMetaobject,
  getMetaobjectLabel,
  getMetaobjectFields,
  getMultipleReferencedMetaobjects,
} from "../../../lib/shopify/metafield-utils";

describe("Shopify Metafield Utilities", () => {
  describe("getMetafieldValue", () => {
    it("should return the metafield value if present", () => {
      const metafield = { value: "Test Value" };
      expect(getMetafieldValue(metafield)).toBe("Test Value");
    });

    it("should return defaultValue if metafield value is not present", () => {
      const metafield = { value: null };
      expect(getMetafieldValue(metafield, "Default")).toBe("Default");
    });

    it("should return null if metafield value is not present and no defaultValue", () => {
      const metafield = { value: undefined };
      expect(getMetafieldValue(metafield)).toBeNull();
    });

    it("should return defaultValue if metafield itself is null", () => {
      expect(getMetafieldValue(null, "Default")).toBe("Default");
    });
  });

  describe("getReferencedMetaobject", () => {
    it("should return the metaobject node if present", () => {
      const metafield = {
        references: {
          edges: [{ node: { id: "gid://shopify/Metaobject/1" } }],
        },
      };
      expect(getReferencedMetaobject(metafield)).toEqual({
        id: "gid://shopify/Metaobject/1",
      });
    });

    it("should return null if references are missing", () => {
      const metafield = {};
      expect(getReferencedMetaobject(metafield)).toBeNull();
    });

    it("should return null if edges are empty", () => {
      const metafield = { references: { edges: [] } };
      expect(getReferencedMetaobject(metafield)).toBeNull();
    });

    it("should return null if metafield is null", () => {
      expect(getReferencedMetaobject(null)).toBeNull();
    });
  });

  describe("getMetaobjectLabel", () => {
    it("should return name.value if present", () => {
      const metaobjectNode = { name: { value: "Test Name" } };
      expect(getMetaobjectLabel(metaobjectNode)).toBe("Test Name");
    });

    it("should return label.value if name.value is not present", () => {
      const metaobjectNode = { label: { value: "Test Label" } };
      expect(getMetaobjectLabel(metaobjectNode)).toBe("Test Label");
    });

    it("should return null if neither name nor label is present", () => {
      const metaobjectNode = {};
      expect(getMetaobjectLabel(metaobjectNode)).toBeNull();
    });

    it("should return null if metaobjectNode is null", () => {
      expect(getMetaobjectLabel(null)).toBeNull();
    });
  });

  describe("getMetaobjectFields", () => {
    it("should return an object of key-value pairs from fields", () => {
      const metaobjectNode = {
        fields: [
          { key: "field1", value: "value1" },
          { key: "field2", value: "value2" },
        ],
      };
      expect(getMetaobjectFields(metaobjectNode)).toEqual({
        field1: "value1",
        field2: "value2",
      });
    });

    it("should return an empty object if fields array is missing or empty", () => {
      expect(getMetaobjectFields({ fields: [] })).toEqual({});
      expect(getMetaobjectFields({})).toEqual({});
    });

    it("should return an empty object if metaobjectNode is null", () => {
      expect(getMetaobjectFields(null)).toEqual({});
    });
  });

  describe("getMultipleReferencedMetaobjects", () => {
    it("should return an array of metaobject nodes", () => {
      const metafield = {
        references: {
          edges: [
            { node: { id: "gid://shopify/Metaobject/1" } },
            { node: { id: "gid://shopify/Metaobject/2" } },
          ],
        },
      };
      expect(getMultipleReferencedMetaobjects(metafield)).toEqual([
        { id: "gid://shopify/Metaobject/1" },
        { id: "gid://shopify/Metaobject/2" },
      ]);
    });

    it("should return an empty array if references are missing", () => {
      const metafield = {};
      expect(getMultipleReferencedMetaobjects(metafield)).toEqual([]);
    });

    it("should return an empty array if edges are empty", () => {
      const metafield = { references: { edges: [] } };
      expect(getMultipleReferencedMetaobjects(metafield)).toEqual([]);
    });

    it("should return an empty array if metafield is null", () => {
      expect(getMultipleReferencedMetaobjects(null)).toEqual([]);
    });
  });
});

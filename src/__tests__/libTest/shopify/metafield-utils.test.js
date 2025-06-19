import {
  getMetafieldValue,
  getReferencedMetaobject,
  getMetaobjectLabel,
} from "@/lib/shopify/metafield-utils";

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
});

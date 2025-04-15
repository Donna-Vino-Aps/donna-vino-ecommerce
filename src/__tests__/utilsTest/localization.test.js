import {
  languageToShopifyLanguage,
  getShopifyLanguage,
} from "@/utils/localization";

describe("Localization utilities", () => {
  describe("getShopifyLanguage", () => {
    it("should return the correct Shopify language code for English", () => {
      expect(getShopifyLanguage("en")).toBe("EN");
    });

    it("should return the correct Shopify language code for Danish", () => {
      expect(getShopifyLanguage("dk")).toBe("DA");
    });

    it("should default to EN for unknown language codes", () => {
      expect(getShopifyLanguage("fr")).toBe("EN");
      expect(getShopifyLanguage(undefined)).toBe("EN");
      expect(getShopifyLanguage(null)).toBe("EN");
    });
  });

  describe("languageToShopifyLanguage", () => {
    it("should have the correct mapping", () => {
      expect(languageToShopifyLanguage).toEqual({
        en: "EN",
        dk: "DA",
      });
    });
  });
});

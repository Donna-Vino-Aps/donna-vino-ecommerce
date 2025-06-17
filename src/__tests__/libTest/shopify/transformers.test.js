import {
  reshapeCollectionResponse,
  transformShopifyEventProduct,
  transformShopifyWineProduct,
} from "@/lib/shopify/transformers";
import * as metafieldUtils from "@/lib/shopify/metafield-utils";
import * as logging from "@/utils/logging";

jest.mock("@/lib/shopify/metafield-utils");
jest.mock("@/utils/logging");

const mockShopifyProductBase = {
  id: "gid://shopify/Product/123",
  title: "Test Product",
  handle: "test-product",
  description: "This is a test product.",
  images: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductImage/1",
          url: "https://example.com/image1.jpg",
          altText: "Alt text 1",
        },
      },
    ],
  },
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/101",
          price: { amount: "100.00", currencyCode: "DKK" },
          availableForSale: true,
          quantityAvailable: 10,
        },
      },
    ],
  },
};

const mockShopifyEventProductSpecific = {
  ...mockShopifyProductBase,
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/102",
          price: { amount: "50.00", currencyCode: "EUR" },
          availableSeats: 50,
        },
      },
    ],
  },
  date: { value: "2024-12-31" },
  menuDescription: { value: "Delicious menu" },
  wineDescription: { value: "Fine wines" },
  winery: { value: "Test Winery" },
  wine: { value: "Test Wine" },
  timeStart: { value: "2024-12-31T18:00:00Z" },
  timeEnd: { value: "2024-12-31T22:00:00Z" },
  location: { value: "Test Location" },
  totalSeats: { value: "100" },
};

const mockShopifyWineProductSpecific = {
  ...mockShopifyProductBase,
  country: { value: "Country Name" },
  region: { value: "Region Name" },
  wineVariety: { value: "Variety Name" },
  producer: { value: "Producer Name" },
  vineyard: { value: "Vineyard Name" },
  grape: { value: "Grape Name" },
  alcoholContent: { value: "12.5%" },
  vintage: { value: "2020" },
  servingTemperature: { value: "16-18°C" },
  tasteProfile: { value: "Bold and fruity" },
  volume: { value: '{"value": 0.75, "unit": "L"}' },
  softCrisp: { value: "5" },
  drySmooth: { value: "5" },
  velvetyAstringent: { value: "5" },
  delicateBold: { value: "5" },
};

describe("Shopify Data Transformers", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    metafieldUtils.getMetafieldValue.mockImplementation(
      (field) => field?.value || null,
    );
    metafieldUtils.getReferencedMetaobject.mockImplementation(
      (field) => field?.references?.edges?.[0]?.node || null,
    );
    metafieldUtils.getMetaobjectLabel.mockImplementation(
      (node) => node?.name?.value || node?.label?.value || null,
    );
    metafieldUtils.getMetaobjectFields.mockImplementation((node) => {
      if (!node?.fields) return {};
      return node.fields.reduce((acc, f) => ({ ...acc, [f.key]: f.value }), {});
    });
    metafieldUtils.getMultipleReferencedMetaobjects.mockImplementation(
      (field) => field?.references?.edges?.map((e) => e.node) || [],
    );
  });

  describe("reshapeCollectionResponse", () => {
    const mockTransformer = jest.fn((product) => ({
      ...product,
      transformed: true,
    }));

    it("should reshape the Shopify collection and transform products", () => {
      const shopifyCollection = {
        id: "gid://shopify/Collection/1",
        handle: "test-collection",
        title: "Test Collection",
        description: "A collection for testing.",
        products: {
          edges: [
            { node: { ...mockShopifyProductBase, id: "p1" } },
            { node: { ...mockShopifyProductBase, id: "p2" } },
          ],
        },
      };
      const result = reshapeCollectionResponse(
        shopifyCollection,
        mockTransformer,
      );

      expect(result.id).toBe(shopifyCollection.id);
      expect(result.title).toBe(shopifyCollection.title);
      expect(result.products.length).toBe(2);
      expect(mockTransformer).toHaveBeenCalledTimes(2);
      expect(result.products[0].transformed).toBe(true);
    });

    it("should return null if shopifyCollection is null or undefined", () => {
      expect(reshapeCollectionResponse(null, mockTransformer)).toBeNull();
      expect(reshapeCollectionResponse(undefined, mockTransformer)).toBeNull();
      expect(logging.logInfo).toHaveBeenCalledWith(
        "reshapeCollectionResponse received null or undefined shopifyCollection",
      );
    });

    it("should return empty products array if products are missing", () => {
      const shopifyCollection = { id: "1", title: "No Products" };
      const result = reshapeCollectionResponse(
        shopifyCollection,
        mockTransformer,
      );
      expect(result.products).toEqual([]);
    });
  });

  describe("transformShopifyEventProduct", () => {
    it("should transform a raw Shopify event product to the application shape", () => {
      const result = transformShopifyEventProduct(
        mockShopifyEventProductSpecific,
      );

      expect(result.id).toBe(mockShopifyEventProductSpecific.id);
      expect(result.title).toBe(mockShopifyEventProductSpecific.title);
      expect(result.price).toBe(50.0);
      expect(result.currency).toBe("EUR");
      expect(result.availableSeats).toBe(50);
      expect(result.date).toBe("2024-12-31");
      expect(result.timeStart).toBeInstanceOf(Date);
      expect(result.timeEnd).toBeInstanceOf(Date);
      expect(result.totalSeats).toBe(100);
      expect(result.images.length).toBe(1);
      expect(result.images[0].url).toBe("https://example.com/image1.jpg");
    });

    it("should handle missing optional fields gracefully for event product", () => {
      const minimalEventProduct = {
        ...mockShopifyProductBase,
        variants: { edges: [{ node: { id: "v1" } }] },
      };
      metafieldUtils.getMetafieldValue.mockReturnValue(null);
      const result = transformShopifyEventProduct(minimalEventProduct);
      expect(result.price).toBeNull();
      expect(result.availableSeats).toBe(0);
      expect(result.date).toBeNull();
      expect(result.timeStart).toBeNull();
    });

    it("should return original string if timeStart parsing fails", () => {
      const productWithInvalidTime = {
        ...mockShopifyEventProductSpecific,
        timeStart: { value: "invalid-date-string" },
      };
      const result = transformShopifyEventProduct(productWithInvalidTime);
      expect(result.timeStart).toBe("invalid-date-string");
      expect(logging.logError).toHaveBeenCalledWith(
        "Invalid date-time string provided:",
        { utcTimeString: "invalid-date-string" },
      );
    });
  });

  describe("transformShopifyWineProduct", () => {
    beforeEach(() => {
      metafieldUtils.getMetafieldValue.mockImplementation(
        (field) => field?.value || null,
      );
      metafieldUtils.getReferencedMetaobject.mockImplementation((field) => {
        if (field === mockShopifyWineProductSpecific.country)
          return mockShopifyWineProductSpecific.country;
        if (field === mockShopifyWineProductSpecific.producer)
          return mockShopifyWineProductSpecific.producer;
        return field?.references?.edges?.[0]?.node || null;
      });
      metafieldUtils.getMetaobjectLabel.mockImplementation((node) => {
        if (node === mockShopifyWineProductSpecific.country)
          return "Mock Country Label";
        return node?.name?.value || node?.label?.value || null;
      });
      metafieldUtils.getMetaobjectFields.mockImplementation((node) => {
        if (node === mockShopifyWineProductSpecific.producer)
          return { name: "Mock Producer Fields" };
        if (node?.name === "Mock Grape 1 Fields")
          return { name: "Mock Grape 1 Fields" };
        if (node?.name === "Mock Grape 2 Fields")
          return { name: "Mock Grape 2 Fields" };
        if (!node?.fields) return {};
        return node.fields.reduce(
          (acc, f) => ({ ...acc, [f.key]: f.value }),
          {},
        );
      });
      metafieldUtils.getMultipleReferencedMetaobjects.mockImplementation(
        (field) => {
          if (field === mockShopifyWineProductSpecific.grape)
            return [
              { name: "Mock Grape 1 Fields" },
              { name: "Mock Grape 2 Fields" },
            ];
          return field?.references?.edges?.map((e) => e.node) || [];
        },
      );
    });

    it("should transform a raw Shopify wine product to the application shape", () => {
      const result = transformShopifyWineProduct(
        mockShopifyWineProductSpecific,
      );

      expect(result.id).toBe(mockShopifyWineProductSpecific.id);
      expect(result.title).toBe(mockShopifyWineProductSpecific.title);
      expect(result.price).toBe(100.0);
      expect(result.currency).toBe("DKK");
      expect(result.volume).toEqual({ value: 0.75, unit: "L" });
      expect(result.alcoholContent).toBe("12.5%");
      expect(result.vintage).toBe("2020");

      expect(metafieldUtils.getReferencedMetaobject).toHaveBeenCalledWith(
        mockShopifyWineProductSpecific.country,
      );
      expect(metafieldUtils.getMetaobjectLabel).toHaveBeenCalledWith(
        mockShopifyWineProductSpecific.country,
      );
      expect(result.country).toBe("Mock Country Label");

      expect(metafieldUtils.getReferencedMetaobject).toHaveBeenCalledWith(
        mockShopifyWineProductSpecific.producer,
      );
      expect(metafieldUtils.getMetaobjectFields).toHaveBeenCalledWith(
        mockShopifyWineProductSpecific.producer,
      );
      expect(result.producer).toEqual({ name: "Mock Producer Fields" });

      expect(
        metafieldUtils.getMultipleReferencedMetaobjects,
      ).toHaveBeenCalledWith(mockShopifyWineProductSpecific.grape);
      expect(metafieldUtils.getMetaobjectFields).toHaveBeenCalledWith({
        name: "Mock Grape 1 Fields",
      });
      expect(metafieldUtils.getMetaobjectFields).toHaveBeenCalledWith({
        name: "Mock Grape 2 Fields",
      });
      expect(result.grapes).toEqual([
        { name: "Mock Grape 1 Fields" },
        { name: "Mock Grape 2 Fields" },
      ]);

      expect(metafieldUtils.getMetafieldValue).toHaveBeenCalledWith(
        mockShopifyWineProductSpecific.alcoholContent,
      );
      expect(metafieldUtils.getMetafieldValue).toHaveBeenCalledWith(
        mockShopifyWineProductSpecific.vintage,
      );
    });

    it("should handle missing optional fields gracefully for wine product", () => {
      const minimalWineProduct = {
        ...mockShopifyProductBase,
        variants: { edges: [{ node: { id: "v1" } }] },
      };
      metafieldUtils.getMetafieldValue.mockReturnValue(null);
      metafieldUtils.getReferencedMetaobject.mockReturnValue(null);
      metafieldUtils.getMultipleReferencedMetaobjects.mockReturnValue([]);

      const result = transformShopifyWineProduct(minimalWineProduct);
      expect(result.price).toBeNull();
      expect(result.country).toBeNull();
      expect(result.producer).toEqual({});
      expect(result.grapes).toEqual([]);
      expect(result.volume).toBeNull();
    });

    it("should parse volume from a JSON numeric string without logging an error", () => {
      const productWithNumericJsonVolume = {
        ...mockShopifyWineProductSpecific,
        volume: { value: "0.5" },
      };
      const result = transformShopifyWineProduct(productWithNumericJsonVolume);
      expect(result.volume).toEqual({ value: 0.5, unit: "L" });
      expect(logging.logError).not.toHaveBeenCalled();
    });

    it("should store raw volume if JSON.parse and numeric parse fails", () => {
      const productWithInvalidVolume = {
        ...mockShopifyWineProductSpecific,
        volume: { value: "invalid-volume" },
      };
      const result = transformShopifyWineProduct(productWithInvalidVolume);
      expect(result.volume).toEqual({
        value: null,
        unit: "L",
        raw: "invalid-volume",
      });
      expect(logging.logError).toHaveBeenCalledTimes(1);
    });
  });
});

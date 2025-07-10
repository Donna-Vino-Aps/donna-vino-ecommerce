import {
  getEventsCollection,
  getWinesCollection,
  fetchPreSaleWines,
} from "@/lib/shopify/services";
import * as fetchers from "@/lib/shopify/fetchers";
import * as transformers from "@/lib/shopify/transformers";
import {
  GET_COLLECTION_WITH_EVENT_PRODUCTS_QUERY,
  GET_COLLECTION_WITH_WINE_PRODUCTS_QUERY,
} from "@/graphql/shopify-queries";

jest.mock("@/lib/shopify/fetchers");
jest.mock("@/lib/shopify/transformers");

const mockRawCollection = {
  id: "gid://shopify/Collection/raw1",
  title: "Raw Collection",
  products: {
    edges: [{ node: { id: "rawProd1" } }],
  },
};

const mockTransformedProduct = {
  id: "transformedProd1",
  title: "Transformed Product",
};
const mockReshapedCollection = {
  id: "gid://shopify/Collection/reshaped1",
  title: "Reshaped Collection",
  products: [mockTransformedProduct],
};

describe("Shopify Service Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fetchers.getRawCollectionByHandle.mockResolvedValue(mockRawCollection);
    transformers.reshapeCollectionResponse.mockReturnValue(
      mockReshapedCollection,
    );
  });

  describe("getEventsCollection", () => {
    it("should fetch, reshape, and transform event collection data", async () => {
      const result = await getEventsCollection("en");

      expect(fetchers.getRawCollectionByHandle).toHaveBeenCalledTimes(1);
      expect(fetchers.getRawCollectionByHandle).toHaveBeenCalledWith(
        GET_COLLECTION_WITH_EVENT_PRODUCTS_QUERY,
        "events",
        "en",
      );
      expect(transformers.reshapeCollectionResponse).toHaveBeenCalledTimes(1);
      expect(transformers.reshapeCollectionResponse).toHaveBeenCalledWith(
        mockRawCollection,
        transformers.transformShopifyEventProduct,
      );
      expect(result).toEqual(mockReshapedCollection);
    });

    it("should use 'en' as default language", async () => {
      await getEventsCollection();
      expect(fetchers.getRawCollectionByHandle).toHaveBeenCalledWith(
        expect.any(String),
        "events",
        "en",
      );
    });
  });

  describe("getWinesCollection", () => {
    const wineCollectionHandle = "all-wines";
    it("should fetch, reshape, and transform a specific wine collection", async () => {
      fetchers.getRawCollectionByHandle.mockResolvedValue(mockRawCollection);
      transformers.reshapeCollectionResponse.mockReturnValue(
        mockReshapedCollection,
      );

      const result = await getWinesCollection(wineCollectionHandle, "dk");

      expect(fetchers.getRawCollectionByHandle).toHaveBeenCalledTimes(1);
      expect(fetchers.getRawCollectionByHandle).toHaveBeenCalledWith(
        GET_COLLECTION_WITH_WINE_PRODUCTS_QUERY,
        wineCollectionHandle,
        "dk",
      );
      expect(transformers.reshapeCollectionResponse).toHaveBeenCalledTimes(1);
      expect(transformers.reshapeCollectionResponse).toHaveBeenCalledWith(
        mockRawCollection,
        transformers.transformShopifyWineProduct,
      );
      expect(result).toEqual(mockReshapedCollection);
    });

    it("should use 'en' as default language for wines", async () => {
      await getWinesCollection(wineCollectionHandle);
      expect(fetchers.getRawCollectionByHandle).toHaveBeenCalledWith(
        expect.any(String),
        wineCollectionHandle,
        "en",
      );
    });
  });

  describe("fetchPreSaleWines", () => {
    it("should call getWinesCollection with 'pre-sale-wines' handle", async () => {
      const result = await fetchPreSaleWines("fr");

      expect(fetchers.getRawCollectionByHandle).toHaveBeenCalledTimes(1);
      expect(fetchers.getRawCollectionByHandle).toHaveBeenCalledWith(
        GET_COLLECTION_WITH_WINE_PRODUCTS_QUERY,
        "pre-sale-wines",
        "fr",
      );
      expect(transformers.reshapeCollectionResponse).toHaveBeenCalledTimes(1);
      expect(transformers.reshapeCollectionResponse).toHaveBeenCalledWith(
        mockRawCollection,
        transformers.transformShopifyWineProduct,
      );
      expect(result).toEqual(mockReshapedCollection);
    });

    it("should default to 'en' language for pre-sale wines", async () => {
      await fetchPreSaleWines();
      expect(fetchers.getRawCollectionByHandle).toHaveBeenCalledWith(
        GET_COLLECTION_WITH_WINE_PRODUCTS_QUERY,
        "pre-sale-wines",
        "en",
      );
    });
  });

  it("should return null if getRawCollectionByHandle returns null for events", async () => {
    fetchers.getRawCollectionByHandle.mockResolvedValue(null);
    transformers.reshapeCollectionResponse.mockReturnValue(null);
    const result = await getEventsCollection();
    expect(result).toBeNull();
  });

  it("should return null if getRawCollectionByHandle returns null for wines", async () => {
    fetchers.getRawCollectionByHandle.mockResolvedValue(null);
    transformers.reshapeCollectionResponse.mockReturnValue(null);
    const result = await getWinesCollection("some-wines");
    expect(result).toBeNull();
  });
});

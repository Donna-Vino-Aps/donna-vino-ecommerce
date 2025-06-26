// This utility function takes a raw wine object and normalizes it into a more usable format
export const normalizeWineData = (wine) => {
  const variants = wine.variants || [];

  const variantMap = {
    bottle: variants[0],
    case: variants[1],
  };

  const defaultVariant = variantMap.bottle;
  const caseVariant = variantMap.case;

  const bottlePrice = defaultVariant?.price?.amount ?? 0;
  const casePrice = caseVariant?.price?.amount ?? 0;
  const quantityAvailable = defaultVariant?.quantityAvailable || 0;
  const volume = wine.volume?.value;

  return {
    id: wine.id,
    title: wine.title,
    bottlePrice,
    casePrice,
    imageUrl: wine.images?.[0]?.url,
    description: wine.description,
    inStock: quantityAvailable > 0,
    quantityAvailable,
    grape: wine.grape,
    vineyard: wine.vineyard,
    country: wine.country,
    region: wine.region,
    wineVariety: wine.wineVariety,
    volume,
    rating: 4.0,
    nrOfRatings: 10,
    pricePerLiterBottle: volume ? (bottlePrice / volume).toFixed(2) : null,
    pricePerLiterCase: volume ? (casePrice / (volume * 6)).toFixed(2) : null,
    variantMap,
  };
};

// this utility function retrieves a wine by its slug from a passed list of wines
export const getWineBySlug = (slug, wines) => {
  return wines.find((wine) => wine.slug === slug);
};

// this utility function generates a URL for a wine based on its handle
export const getWineUrl = (handle) => `/pre-sale/${handle}`;

// This utility function takes a raw wine object and normalizes it into a more usable format

export const normalizeWineData = (wine, translations) => {
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

  const vintage = wine.vintage ?? "-";
  const producer = wine.producer ?? "-";
  const servingTemperature = wine.servingTemperature ?? "-";
  const alcoholContent = wine.alcoholContent ?? "-";
  const tasteValues = [
    {
      left: translations["tasteProfile.delicate"],
      right: translations["tasteProfile.bold"],
      value: Math.round((wine.delicateBold ?? 0) * 100),
    },
    {
      left: translations["tasteProfile.velvety"],
      right: translations["tasteProfile.astringent"],
      value: Math.round((wine.velvetyAstringent ?? 0) * 100),
    },
    {
      left: translations["tasteProfile.dry"],
      right: translations["tasteProfile.smooth"],
      value: Math.round((wine.drySmooth ?? 0) * 100),
    },
    {
      left: translations["tasteProfile.soft"],
      right: translations["tasteProfile.crisp"],
      value: Math.round((wine.softCrisp ?? 0) * 100),
    },
  ];

  return {
    id: wine.id,
    slug: wine.handle, // Using handle as slug
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
    vintage,
    producer,
    servingTemperature,
    alcoholContent,
    tasteProfile: wine.tasteProfile,
    tasteValues,
  };
};

// This utility function normalizes a list of wines by mapping each wine object
export const normalizeWineList = (wines, translations) =>
  wines.map((wine) =>
    normalizeWineData({ ...wine, slug: wine.handle }, translations),
  );

// this utility function retrieves a wine by its slug from a passed list of wines
export const getWineBySlug = (slug, wines) => {
  return wines.find((wine) => wine.slug === slug);
};

// this utility function generates a URL for a wine based on its slug
export const getWineUrl = (wine) => `/wines/pre-sale/${wine.slug}`;

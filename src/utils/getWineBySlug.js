export const getWineBySlug = (slug, wines) => {
  return wines.find((wine) => wine.slug === slug);
};

export const languageToShopifyLocale = {
  en: "EN",
  dk: "DA",
};

export function getShopifyLocale(language) {
  return languageToShopifyLocale[language] || "EN";
}

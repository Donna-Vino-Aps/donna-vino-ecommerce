export const languageToShopifyLanguage = {
  en: "EN",
  dk: "DA",
};

export function getShopifyLanguage(language) {
  return languageToShopifyLanguage[language] || "EN";
}

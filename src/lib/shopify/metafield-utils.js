export const getMetafieldValue = (metafield, defaultValue = null) =>
  metafield?.value || defaultValue;

export const getReferencedMetaobject = (metafield, defaultValue = null) => {
  return metafield?.references?.edges?.[0]?.node || defaultValue;
};

export const getMetaobjectLabel = (metaobjectNode, defaultValue = null) => {
  return (
    metaobjectNode?.name?.value || metaobjectNode?.label?.value || defaultValue
  );
};

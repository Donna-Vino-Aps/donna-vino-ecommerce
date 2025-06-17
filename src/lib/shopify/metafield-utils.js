export const getMetafieldValue = (metafield, defaultValue = null) =>
  metafield?.value || defaultValue;

export const getReferencedMetaobject = (metafield) => {
  return metafield?.references?.edges?.[0]?.node || null;
};

export const getMetaobjectLabel = (metaobjectNode) => {
  return metaobjectNode?.name?.value || metaobjectNode?.label?.value || null;
};

export const getMetaobjectFields = (metaobjectNode) => {
  if (!metaobjectNode?.fields) return {};
  return metaobjectNode.fields.reduce((acc, field) => {
    acc[field.key] = field.value;
    return acc;
  }, {});
};

export const getMultipleReferencedMetaobjects = (metafield) => {
  return metafield?.references?.edges?.map((edge) => edge.node) || [];
};

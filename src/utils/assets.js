export const withBasePath = (relativePath) => {
  const trimmed = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${import.meta.env.BASE_URL}${trimmed}`;
};

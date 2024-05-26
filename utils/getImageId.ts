const getImageId = (key: string) => {
  return `${Date.now()}-${key}`;
};

export default getImageId;

import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const MAX_IMAGE_SIZE_BYTES = 3 * 1024 * 1024; // 3MB

const resizeImage = async (
  uri: string,
  initialWidth: number,
  initialHeight: number,
  maxSizeBytes: number = MAX_IMAGE_SIZE_BYTES
) => {
  let resizedUri = uri;
  let size = await getImageSize(uri);
  let quality = 0.9; // Start with higher quality and reduce

  while (size > maxSizeBytes && quality > 0.1) {
    const resizedImage = await manipulateAsync(resizedUri, [], {
      compress: quality, // Adjust compression level as needed
      format: SaveFormat.JPEG,
    });
    resizedUri = resizedImage.uri;
    size = await getImageSize(resizedUri);
    initialWidth = Math.floor(initialWidth * 0.9);
    initialHeight = Math.floor(initialHeight * 0.9);
    quality -= 0.1; // Decrease quality incrementally
  }
  return { resizedUri, resizedSize: size };
};

const getImageSize = async (uri: string): Promise<number> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob.size;
};

export default resizeImage;

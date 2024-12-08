import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(
    typeof error === "string"
      ? error
      : JSON.stringify(error)
  );
};
export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}
export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      if (ctx) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(
            new File([blob!], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
          );
        }, "image/jpeg");
      }
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

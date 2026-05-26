export const convertImageToWebP = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error("Unable to read image file."));
    };

    reader.onload = () => {
      const source = typeof reader.result === "string" ? reader.result : "";

      if (!source) {
        reject(new Error("Unable to load image file."));
        return;
      }

      const image = new Image();

      image.onerror = () => {
        reject(new Error("Unable to process image file."));
      };

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Unable to create image canvas."));
          return;
        }

        context.drawImage(image, 0, 0);

        const webpImage = canvas.toDataURL("image/webp", 0.92);

        if (!webpImage.startsWith("data:image/webp")) {
          reject(
            new Error("This browser could not convert the image to WebP."),
          );
          return;
        }

        resolve(webpImage);
      };

      image.src = source;
    };

    reader.readAsDataURL(file);
  });
  
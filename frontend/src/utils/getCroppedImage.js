export const getCroppedImg = (imageSrc, crop, fileName = 'cropped-image.jpg') => {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getRadianAngle = (degreeValue) => (degreeValue * Math.PI) / 180;

  return createImage(imageSrc).then((image) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      let fileUrl;
      canvas.toBlob((blob) => {
        fileUrl = URL.createObjectURL(blob);
      }, "image/jpeg");
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const file = new File([blob], fileName, { type: 'image/jpeg' });
        resolve({file,fileUrl});  //* Resolve the cropped image as an object of {File, FileUrl}
      }, 'image/jpeg');
    });
  });
};


export default getCroppedImg;
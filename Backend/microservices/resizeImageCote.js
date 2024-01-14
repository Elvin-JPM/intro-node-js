const cote = require("cote");
const jimp = require("jimp");

const responder = new cote.Responder({ name: "image-resizer" });

responder.on("resize", async (req, done) => {
  const { width, height, imagePath } = req;
  console.log("Inside image resizer...");
  console.log("Image Path:", `../public/avatares/${imagePath}`);

  try {
    const image = await jimp.read(`../public/avatares/${imagePath}`);
    image.resize(width, height);
    const outputPath = `../public/avatares/resized_${imagePath}`;
    console.log("Output Path:", outputPath);
    image.write(outputPath);
    console.log("Image resized successfully.");
    done(null, `Image resized successfully. Output path: ${outputPath}`);
  } catch (error) {
    console.error("Error resizing image: ", error.message);
    done(error);
  }
});

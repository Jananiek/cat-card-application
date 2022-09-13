import Jimp from 'jimp';
import fs from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import { getRandomCatWithText } from '../connectors/cataasConnector.js';
import { verifyPathExistence } from '../../../util/helpers.js';
dotenv.config();

export async function bindTwoImages(inputArguments) {
  //Assigning default values if values defined from input data
  const {
    greeting = 'Hello',
    who = 'You',
    width = 400,
    height = 500,
    color = 'Pink',
    size = 100,
    encoding = 'binary',
  } = inputArguments;
  const imageBodies = await Promise.all(
    [greeting, who].map(async element => {
      return await getRandomCatWithText({
        width,
        height,
        size,
        color,
        encoding,
        text: element,
      });
    }),
  );
  const finalImage = await joinImages(imageBodies);
  const fileOut = join(process.cwd(), `${process.env.IMAGE_UPLOAD_PATH}/cat-card.jpg`);

  // Check image saving paths already is there, if not create the directory
  verifyPathExistence(fileOut);
  //write file in asynchronous non-blocking way
  await finalImage.writeAsync(fileOut);
}
export async function joinImages(imageBodies) {
  // open incoming image files
  const jimpImages = await Promise.all(imageBodies.map(async imageBody => await Jimp.read(imageBody)));

  //Measuring final images dimensions using incoming images
  const finalImageWidth = jimpImages[0].getWidth() + jimpImages[1].getWidth();
  const finalImageHeight = Math.max(jimpImages[0].getHeight(), jimpImages[1].getHeight());
  // Create new empty Jimp image
  const finalImage = new Jimp(finalImageWidth, finalImageHeight);

  //Blit the image with another Jimp image at x, y, optionally cropped.
  // Here instead of merging each child images can do resizing and then create
  //final image according to new measurements
  finalImage.blit(jimpImages[0], 0, 0);
  finalImage.blit(jimpImages[1], jimpImages[0].getWidth(), 0);
  return finalImage;
}

import Jimp from 'jimp';
import fs from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import { getRandomCatWithText } from '../connectors/cataasConnector.js';
import { verifyPathExistence } from '../../../util/helpers.js';
dotenv.config();

/**
 * @desc Get random cat image with the given text in it. Image attributes and text color
 * and size will depend on the options which has passed.
 *
 * @param {object} inputArguments - Object that contains incoming options
 * @param {number} [inputArguments.width] - Width of the image
 * @param {number} [inputArguments.height] - Height of the image
 * @param {number} [inputArguments.size] - Size of the text
 * @param {string} [inputArguments.color] - Color of the image text
 * @param {string} [inputArguments.encoding] - Character encoding for image. if not provided it defaults to 'utf8'
 * @param {string} inputArguments.greeting - Random text that displays in one image
 * @param {number} inputArguments.who - Random text that displays in another image
 */
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
  //Getting image saving path
  const fileOut = join(process.cwd(), `${process.env.IMAGE_UPLOAD_PATH}/cat-card.jpg`);

  // Check image saving paths already is there, if not create the directory
  verifyPathExistence(fileOut);
  //write or re-write file in asynchronous non-blocking way
  await finalImage.writeAsync(fileOut);
}

/**
 * @desc Bind two images and save it in a specific file directory(default is src/uploads)
 *
 * @param {Object[]} imageBodies - array of buffered images
 * @returns {object<Jimp>}
 * @see {@link https://github.com/oliver-moran/jimp#readme}
 */
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

import Axios from 'axios';
import dotenv from 'dotenv';
import { CAT_SAYS } from './constants.js';
dotenv.config();
const axios = Axios.create({ baseURL: `${process.env.CATAAS_API}/${CAT_SAYS}` });

/**
 * @desc Call cataas API to get random cat image with the given text in it.
 * Image attributes and text color and size will depend on the options which has passed.
 *
 * queryData - Object that contains filtered options
 * @param {number} queryData.width - Width of the image
 * @param {number} queryData.height - Height of the image
 * @param {number} queryData.size - Size of the image
 * @param {string} queryData.color - Color of the image text
 * @param {string} [queryData.encoding] - Character encoding for image. if not provided it defaults to 'utf8'
 * @param {string} queryData.text - Random text that displays in images
 * @returns {Promise<Buffer>} Image as a buffer
 */
export async function getRandomCatWithText(queryData) {
  const { width, height, size, color, encoding, text } = queryData;

  try {
    // Call cataas API through Axios api client
    const catResponse = await axios.get(
      `/${text}?width=${width}&height=${height}&color=${color}&s=${size}&encoding=${encoding}`,
      {
        responseType: 'arraybuffer',
      },
    );
    return Buffer.from(catResponse.data, 'binary');
    //return catResponse.data;
  } catch (error) {
    throw new Error(`Error on getting image from CATAAS : ${error.message}`);
  }
}

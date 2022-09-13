import fs from 'fs';
import path from 'path';
/**
 * Check path required directory is exists, if not create
 * @param filePath: string Path to the file
 */
export function verifyPathExistence(filePath) {
  const directoryName = path.dirname(filePath);
  if (fs.existsSync(directoryName)) {
    return true;
  }
  verifyPathExistence(directoryName);
  fs.mkdirSync(directoryName);
}

export default { verifyPathExistence };

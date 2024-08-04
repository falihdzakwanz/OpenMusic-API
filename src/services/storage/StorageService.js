import fs from 'fs';
import PayloadTooLargeError from '../../exceptions/PayloadTooLargeError.js';

class StorageService {
  constructor(folder) {
    this._folder = folder;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const MAX_FILE_SIZE = 512000;
    if (file._data.length > MAX_FILE_SIZE) {
      throw new PayloadTooLargeError(`File size should not exceed ${MAX_FILE_SIZE / 1024}KB`);
    }

    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

export default StorageService;

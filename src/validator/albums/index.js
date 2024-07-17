import { AlbumPayloadSchema } from './schema';
import InvariantError from '../../exceptions/InvariantError';

const AlbumsValidator = {
    validateAlbumPayload: (payload) => {
        const validationResult = AlbumPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

export default AlbumsValidator;
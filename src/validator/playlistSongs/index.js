import InvariantError from '../../exceptions/InvariantError.js';
import PlaylistSongPayloadSchema from './schema.js';

const PlaylistSongValidator = {
  validatePlaylistSongPayload: (payload) => {
    const validationResult = PlaylistSongPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default PlaylistSongValidator;

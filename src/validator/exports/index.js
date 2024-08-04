import ExportPlaylistPayloadSchema from './schema.js';
import InvariantError from '../../exceptions/InvariantError.js';

const ExportsValidator = {
  validateExportPlaylistPayload: (payload) => {
    const validationResult = ExportPlaylistPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default ExportsValidator;

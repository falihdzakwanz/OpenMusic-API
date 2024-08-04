import autoBind from 'auto-bind';

class ExportsHandler {
  constructor(exportService, playlistsService, validator) {
    this._exportService = exportService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    autoBind(this);
  }

  async postExportPlaylistHandler(request, h) {
    this._validator.validateExportPlaylistPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;
    const message = {
      userId: credentialId,
      targetEmail: request.payload.targetEmail,
    };

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._exportService.sendMessage('export:playlist', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Your request is in the queue',
    });
    response.code(201);
    return response;
  }
}

export default ExportsHandler;

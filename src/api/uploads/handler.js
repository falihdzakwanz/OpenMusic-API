import autoBind from 'auto-bind';

class UploadsHandler {
  constructor(uploadsService, albumsService, validator) {
    this._uploadsService = uploadsService;
    this._albumsService = albumsService;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadCoverHandler(request, h) {
    const { cover } = request.payload;
    const { id: albumId } = request.params;

    this._validator.validateCoverHeaders(cover.hapi.headers);
    await this._albumsService.checkAlbumById(albumId);

    const filename = await this._uploadsService.writeFile(cover, cover.hapi);
    const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/albums/cover/${filename}`;

    await this._albumsService.addCoverUrl(fileLocation, albumId);

    const response = h.response({
      status: 'success',
      message: 'Cover uploaded successfully',
    });
    response.code(201);
    return response;
  }
}

export default UploadsHandler;

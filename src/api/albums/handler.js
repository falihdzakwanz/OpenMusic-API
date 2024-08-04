import autoBind from 'auto-bind';

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Success update album',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Success delete album',
    };
  }

  async postLikeAlbumByIdHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;
    await this._service.checkAlbumById(albumId);
    await this._service.addLikeAlbumById(albumId, userId);

    const response = h.response({
      status: 'success',
      message: 'Success add like to album',
    });
    response.code(201);
    return response;
  }

  async deleteLikeAlbumByIdHandler(request) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;
    await this._service.checkAlbumById(albumId);
    await this._service.deleteLikeAlbumById(albumId, userId);

    return {
      status: 'success',
      message: 'Success delete like from album',
    };
  }

  async getLikesAlbumByIdHandler(request) {
    const { id: albumId } = request.params;

    await this._service.checkAlbumById(albumId);
    const likes = await this._service.getLikesAlbumCountById(albumId);

    return {
      status: 'success',
      data: {
        likes,
      },
    };
  }
}

export default AlbumsHandler;

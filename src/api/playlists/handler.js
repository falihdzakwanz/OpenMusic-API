import autoBind from 'auto-bind';

class PlaylistsHandler {
  constructor(playlistsService) {
    this._playlistsService = playlistsService;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { name } = request.payload;
    const { id: owner } = request.auth.credentials;

    const playlistId = await this._playlistsService.addPlaylist({ name, owner });

    const response = h.response({
      status: 'success',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: owner } = request.auth.credentials;
    const playlists = await this._playlistsService.getPlaylists(owner);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistHandler(request) {
    const { id } = request.params;
    await this._playlistsService.deletePlaylist(id);

    return {
      status: 'success',
      message: 'Playlist deleted successfully',
    };
  }
}

export default PlaylistsHandler;

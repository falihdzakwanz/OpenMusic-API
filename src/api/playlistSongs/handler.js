import autoBind from 'auto-bind';

class PlaylistSongsHandler {
  constructor(playlistsService, playlistSongService, validator) {
    this._playlistsService = playlistsService;
    this._playlistSongService = playlistSongService;
    this._validator = validator;

    autoBind(this);
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    // const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    console.log(playlistId);
    // await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const { songId } = request.payload;
    console.log(songId);
    const playlistSongId = await this._playlistSongService.addSongToPlaylist(playlistId, songId);
    console.log('from playlist song handler:', playlistSongId);
    const response = h.response({
      status: 'success',
      data: {
        playlistSongId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsFromPlaylistHandler(request) {
    const { id: playlistId } = request.params;
    const songs = await this._playlistSongService.getSongsFromPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async deleteSongFromPlaylistHandler(request) {
    const { id: playlistId, songId } = request.params;
    await this._playlistSongService.deleteSongFromPlaylist(playlistId, songId);

    return {
      status: 'success',
      message: 'Song deleted from playlist successfully',
    };
  }
}

export default PlaylistSongsHandler;

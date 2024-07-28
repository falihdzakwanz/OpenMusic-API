import autoBind from 'auto-bind';

class PlaylistSongsHandler {
  constructor(playlistSongsService) {
    this._playlistSongsService = playlistSongsService;

    autoBind(this);
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const { playlistId, songId } = request.payload;
    const playlistSongId = await this._playlistSongsService.addSongToPlaylist(playlistId, songId);

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
    const { playlistId } = request.params;
    const songs = await this._playlistSongsService.getSongsFromPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async deleteSongFromPlaylistHandler(request) {
    const { playlistId, songId } = request.params;
    await this._playlistSongsService.deleteSongFromPlaylist(playlistId, songId);

    return {
      status: 'success',
      message: 'Song deleted from playlist successfully',
    };
  }
}

export default PlaylistSongsHandler;

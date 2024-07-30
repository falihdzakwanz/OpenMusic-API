import autoBind from 'auto-bind';

class PlaylistSongsHandler {
  constructor(playlistsService, playlistSongService, songsService, validator) {
    this._playlistsService = playlistsService;
    this._playlistSongService = playlistSongService;
    this._songsService = songsService;
    this._validator = validator;

    autoBind(this);
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._songsService.getSongById(songId);
    await this._playlistSongService.addSongToPlaylist(playlistId, songId);
    await this._playlistSongService.addActivity(playlistId, credentialId, 'add', songId);

    const response = h.response({
      status: 'success',
      message: 'Success add song to playlist',
    });
    response.code(201);
    return response;
  }

  async getSongsFromPlaylistHandler(request) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const { playlist, songs } = await this._playlistSongService.getSongsFromPlaylist(playlistId);
    return {
      status: 'success',
      data: {
        playlist: {
          id: playlistId,
          name: playlist.playlist_name,
          username: playlist.username,
          songs: songs.map(({ id, title, performer }) => ({ id, title, performer })),
        },
      },
    };
  }

  async deleteSongFromPlaylistHandler(request) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongService.deleteSongFromPlaylist(playlistId, songId);
    await this._playlistSongService.addActivity(playlistId, credentialId, 'delete', songId);
    return {
      status: 'success',
      message: 'Song deleted from playlist successfully',
    };
  }
}

export default PlaylistSongsHandler;

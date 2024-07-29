import PlaylistSongsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, { playlistsService, playlistSongService, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      playlistsService,
      playlistSongService,
      validator,
    );
    server.route(routes(playlistSongsHandler));
  },
};

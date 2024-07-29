import PlaylistSongsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, { playlistsService, playlistSongservice, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      playlistsService,
      playlistSongservice,
      validator,
    );
    server.route(routes(playlistSongsHandler));
  },
};

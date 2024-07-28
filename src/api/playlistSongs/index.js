import PlaylistSongsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(service, validator);
    server.route(routes(playlistSongsHandler));
  },
};

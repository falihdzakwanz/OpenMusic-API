import UploadsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { uploadsService, albumsService, validator }) => {
    const uploadsHandler = new UploadsHandler(uploadsService, albumsService, validator);
    server.route(routes(uploadsHandler));
  },
};

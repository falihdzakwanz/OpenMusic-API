import CollaborationsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { collaborationsService, notesService, validator }) => {
    const collaborationsHandler = new CollaborationsHandler(
      collaborationsService,
      notesService,
      validator,
    );
    server.route(routes(collaborationsHandler));
  },
};

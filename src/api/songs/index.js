import SongsHandler from "./handler";
import songRoutes from "./routes";

export default {
    name: 'songs',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const songsHandler = new SongsHandler(service, validator);
        server.route(songRoutes(songsHandler));
    },
};
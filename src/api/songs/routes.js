const songRoutes = (handler) => [
    {
        method: 'POST',
        path: '/songs',
        handler: handler.postSongsHandler,
    },
    {
        method: 'GET',
        path: '/songss',
        handler: handler.getSongsByIdHandler,
    },
    {
        method: 'GET',
        path: '/songss/{id}',
        handler: handler.getSongsByIdHandler,
    },
    {
        method: 'PUT',
        path: '/songss/{id}',
        handler: handler.putSongsByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/songss/{id}',
        handler: handler.deleteSongsByIdHandler,
    },
]

export default songRoutes;
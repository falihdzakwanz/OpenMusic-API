import { nanoid } from 'nanoid';
import pg from 'pg';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';

const { Pool } = pg;

class PlaylistSongService {
  constructor(songService) {
    this._songService = songService;
    this._pool = new Pool();
  }

  async addSongToPlaylist(playlistId, songId) {
    await this._songService.getSongById(songId);
    const id = `playlistSong-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Failed to add song to playlist');
    }
    return result.rows[0].id;
  }

  async getSongsFromPlaylist(playlistId) {
    const playlistQuery = {
      text: `
      SELECT 
        playlists.name AS playlist_name, 
        users.username AS username
      FROM playlists
      JOIN users ON playlists.owner = users.id
      WHERE playlists.id = $1
    `,
      values: [playlistId],
    };

    const songsQuery = {
      text: `
      SELECT 
        songs.id, 
        songs.title, 
        songs.performer
      FROM songs
      JOIN playlist_songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1
    `,
      values: [playlistId],
    };

    const playlistResult = await this._pool.query(playlistQuery);
    const songsResult = await this._pool.query(songsQuery);

    if (!playlistResult.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return {
      playlist: playlistResult.rows[0],
      songs: songsResult.rows,
    };
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Failed to delete song from playlist. Id not found');
    }

    return result.rows[0].id;
  }
}

export default PlaylistSongService;

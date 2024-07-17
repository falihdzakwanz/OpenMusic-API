import Pool from 'pg';
import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';

class SongService {
    constructor() {
        this._pool = new Pool();
    }

    async addsSong({ title, year, performer, genre, duration, albumId }) {
        const id = `song-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, year, performer, genre, duration, albumId],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Failed to add song');
        }

        return result.rows[0].id;
    }

    async getSongs() {
        const result = await this._pool.query('SELECT id, title, perfomer FROM songs');
        return result.rows;
    }

    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Song not found');
        }

        return result.rows[0];
    }

    async editSongById(id, { title, year, performer, genre, duration, albumId }) {
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
            values: [title, year, performer, genre, duration, albumId, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Failed to updated song. Id not found');
        }
    }

    async deleteSongById(id) {
        const query = {
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Failed to delete song. Id not found');
        }
    }
}

export default SongService;
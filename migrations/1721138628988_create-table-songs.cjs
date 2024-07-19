/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('songs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        year: {
            type: 'INTEGER',
            notNull: true,
        },
        performer: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        genre: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        duration: {
            type: 'INTEGER',
            notNull: false,
        },
        albumId: {
            type: 'VARCHAR(50)',
            notNull: false,
        },
    });

    pgm.addConstraint('songs', 'fk_songs.albumId_albums.id', {
        foreignKeys: {
            columns: 'albumId',
            references: 'albums(id)',
            onDelete: 'CASCADE'
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('songs');
};

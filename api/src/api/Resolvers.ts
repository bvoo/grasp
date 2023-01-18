import cassandra from 'cassandra-driver';

const cluster = new cassandra.Client({
    contactPoints: ['localhost:9042'],
    localDataCenter: 'datacenter1',
    keyspace: 'notes',
});

let notes: any[] = [];

const Resolvers = {
    Query: {
        getAllNotes: () => {
            let query = 'SELECT * FROM notes';
            cluster.execute(
                query,
                [],
                { prepare: true },
                (err: any, result: { rows: any[] }) => {
                    if (err) {
                        console.log(err);
                    } else {
                        notes = result.rows;
                        return notes;
                    }
                }
            );
            return notes;
        },
        getNote: (_: any, args: any) => {
            console.log(args);
            return notes.find((note) => note.id === args.id);
        },
    },
    Mutation: {
        addNote: (_: any, args: any) => {
            const newNote = {
                id: notes.length + 1,
                title: args.title,
                content: args.content,
            };

            let query =
                'INSERT INTO notes (id, title, content) VALUES (?, ?, ?)';
            cluster.execute(
                query,
                [newNote.id, newNote.title, newNote.content],
                { prepare: true }
            );

            return newNote;
        },
        deleteNote: (_: any, args: any) => {
            let query = 'DELETE FROM notes WHERE id = ?';
            cluster.execute(query, [args.id], { prepare: true });

            return notes.find((note) => note.id === args.id);
        },
    },
};

export default Resolvers;

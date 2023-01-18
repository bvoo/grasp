import { gql } from 'apollo-server-express';

const Schema = gql`
    type Note {
        id: ID!
        title: String!
        content: String
    }

    type Query {
        getAllNotes: [Note]
        getNote(id: Int): Note
    }

    type Mutation {
        addNote(title: String, content: String): Note
    }

    type Mutation {
        deleteNote(id: Int): Note
    }
`;

export default Schema;

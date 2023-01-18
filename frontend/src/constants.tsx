import { gql } from 'graphql-request';

const getAllNotesQuery = gql`
    query {
        getAllNotes {
            id
            title
            content
        }
    }
`;

const addNoteMutation = gql`
    mutation addNote($title: String, $content: String!) {
        addNote(title: $title, content: $content) {
            id
            title
            content
        }
    }
`;

const deleteNoteMutation = gql`
    mutation deleteNote($id: Int!) {
        deleteNote(id: $id) {
            id
        }
    }
`;

export { getAllNotesQuery, addNoteMutation, deleteNoteMutation };

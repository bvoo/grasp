import type {
    NextPage,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next';
import { request } from 'graphql-request';
import { getAllNotesQuery, deleteNoteMutation } from '../constants';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

const Home: NextPage = ({
    result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [notes, setNotes] = useState<any>([]);

    useEffect(() => {
        setNotes(result);
    }, []);

    const deleteNote = (id: string) => {
        console.log(id);
        const res = request(
            'http://localhost:4680/graphql',
            deleteNoteMutation,
            { id: parseInt(id) }
        ).then((res) => {
            const newNotes = notes.filter((item: any) => item.id !== id);
            setNotes(newNotes);
            console.log(res);
        });
    };
    return (
        <div className={styles.main}>
            <div className={styles.noteContainer}>
                {notes.map((item: any) => {
                    return (
                        <div key={item.id} className={styles.noteContent}>
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                            <button
                                onClick={() => {
                                    deleteNote(item.id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
            <Link className={styles.addButton} href="/addpage">
                Add a new entry
            </Link>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await request(
        'http://localhost:4680/graphql',
        getAllNotesQuery
    );
    const result = await res.getAllNotes;

    return {
        props: {
            result,
        },
    };
};

export default Home;

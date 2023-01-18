import { addNoteMutation } from '@/constants';
import request from 'graphql-request';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const AddPage: NextPage = () => {
    const { register, handleSubmit } = useForm();

    const router = useRouter();

    const onSubmit = async (data: any) => {
        request('http://localhost:4680/graphql', addNoteMutation, data).then(
            () => {
                setTimeout(() => {
                    router.push('/');
                }, 100);
            }
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue="Example Title" {...register('title')} />
                <input
                    defaultValue="Example Content...... This is a long text"
                    {...register('content')}
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddPage;

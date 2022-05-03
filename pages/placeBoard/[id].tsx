import PostDetail from '@components/Board/PostDetail';
import Layout from '@components/Layout';
import { NextPage } from 'next';

const BoardPost: NextPage = () => {

    return (
        <Layout>
            <PostDetail />
        </Layout >
    )
}

export default BoardPost;
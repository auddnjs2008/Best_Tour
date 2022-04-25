import PostDetail from '@components/Board/PostDetail';
import Layout from '@components/Layout';
import { NextPage } from 'next';

const BoardPost: NextPage = () => {

    return (
        <Layout>
            <div className="">
                <header className="z-20 bg-white fixed max-w-lg w-full top-0 text-center border-2 p-3 border-yellow-400">술먹기 딱 좋은 안주집 입니다.</header>
                <PostDetail />
            </div>
        </Layout >
    )
}

export default BoardPost;
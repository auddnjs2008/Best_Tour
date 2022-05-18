import { PostWithUser } from '@components/Board/PostBox';
import PostDetail from '@components/Board/PostDetail';
import Layout from '@components/Layout';
import client from '@libs/server/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';


interface IBoardPost {
    post: PostWithUser
}

const BoardPost: NextPage<IBoardPost> = ({ post }) => {

    return (
        <Layout>
            <PostDetail post={post} />
        </Layout >
    )
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: true
    }
}


export const getStaticProps: GetStaticProps = async (ctx) => {
    if (!ctx?.params?.id) {
        return {
            props: {}
        }
    }

    const post = await client.post.findUnique({
        where:
        {
            id: +(ctx.params.id)
        },
        include: {
            user: true
        }
    })

    return {
        props: { post }
    }

}

export default BoardPost;
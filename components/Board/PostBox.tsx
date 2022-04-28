import { Post, User } from '@prisma/client';
import useSWR from 'swr';
import PostItem from './Post';

export interface PostWithUser extends Post {
    user: User;
}

interface IPostResponse {
    ok: boolean;
    posts: PostWithUser[]
}

const PostBox = () => {

    const { data } = useSWR<IPostResponse>("/api/post/allPost");

    return (
        <ul className="mt-16">
            {data?.posts.map((item: PostWithUser) => <PostItem postInfo={item}></PostItem>)}
        </ul>
    )
}

export default PostBox;
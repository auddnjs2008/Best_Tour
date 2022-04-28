import Link from 'next/link';
import { PostWithUser } from './PostBox';

interface IPost {
    postInfo: PostWithUser
}

const Post = ({ postInfo }: IPost) => {

    return (
        <li className="flex p-3 cursor-pointer">
            <div className="mr-8 bg-gray-400 w-10 h-10 rounded-full" />
            <Link href={`/placeBoard/${postInfo.id}`}>
                <a>
                    <div className="">{postInfo.title}</div>
                    <div className="text-sm text-gray-400">{String(postInfo.updatedAt).split("T")[0]}</div>
                </a>
            </Link>
        </li>
    )
}

export default Post;
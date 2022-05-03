import Image from 'next/image';
import Link from 'next/link';
import { PostWithUser } from './PostBox';

interface IPost {
    postInfo: PostWithUser,
}

const Post = ({ postInfo }: IPost) => {
    const { id, user: { avatar } } = postInfo;
    return (
        <li key={id + ""} className="flex p-3 cursor-pointer">
            {avatar ?
                <div className="relative mr-8 bg-gray-400 w-10 h-10 rounded-full overflow-hidden">
                    <Image layout="fill" objectFit='cover' src={`https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${avatar}/public`} />
                </div>
                :
                <div className="mr-8 bg-gray-400 w-10 h-10 rounded-full" />}
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
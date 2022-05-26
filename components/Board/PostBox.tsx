import useUser from '@libs/client/useUser';
import { Post, User } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import PostItem from './Post';

export interface PostWithUser extends Post {
    user: User;
}

interface IPostResponse {
    ok: boolean;
    posts: PostWithUser[]
}

interface IPostBox {
    posts: PostWithUser[]
}
const PostBox = ({ posts }: IPostBox) => {

    const { user } = useUser();
    // const { data } = useSWR<IPostResponse>("/api/post/allPost");
    const [myPosts, setMyPosts] = useState<PostWithUser[]>([]);
    const [page, setPage] = useState(1);
    const [isOnlyMyPost, setIsOnlyMyPost] = useState(false);


    const onCheckClick = (e: React.MouseEvent) => {
        const target = (e.target as Element);
        if (target.tagName === "INPUT" || target.tagName === "LABEL") {
            if (target.id === "all") setIsOnlyMyPost(false);
            else setIsOnlyMyPost(true);
        }
    }

    const onLeftClick = () => {
        if (page === 1) return;
        setPage(prev => prev - 1);
    }

    const onRightClick = () => {
        if (posts && page === Math.ceil(posts.length / 6)) return;
        setPage(prev => prev + 1);
    }

    useEffect(() => {
        if (posts.length === 0) return;
        setMyPosts(posts.filter(post => post.userId === user?.id));
    }, [posts]);


    return (
        <div className="relative bottom-0   h-[90vh] ">
            {posts.length === 0 ?
                <div className="w-full h-full font-semibold flex justify-center items-center">게시글이 없습니다.</div>
                :
                <>
                    <ul className="mt-16 h-[80%] ">
                        {isOnlyMyPost ?
                            myPosts.slice(page === 1 ? 0 : 6 * (page - 1), page === 1 ? 6 : 6 * page).map((item: PostWithUser, index: number) => <PostItem key={index} postInfo={item}></PostItem>)
                            :
                            posts.slice(page === 1 ? 0 : 6 * (page - 1), page === 1 ? 6 : 6 * page).map((item: PostWithUser, index: number) => <PostItem key={index} postInfo={item}></PostItem>)
                        }
                    </ul>
                    <div onClick={onCheckClick} className="flex flex-col absolute top-20 right-5">
                        <label><input name="filter" id="all" type="radio" defaultChecked /> 전체 게시글</label>
                        <label><input name="filter" id="my" type="radio" /> 내 게시글</label>
                    </div>
                    <div className="absolute bottom-20 w-full flex items-center justify-center">
                        <svg onClick={onLeftClick} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="select-none">
                            {page} / {posts ? Math.ceil(posts.length / 6) : 0}</span>
                        <svg onClick={onRightClick} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </>
            }
        </div>
    )
}




export default PostBox;
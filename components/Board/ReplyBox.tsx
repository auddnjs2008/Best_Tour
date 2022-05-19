import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { Reply, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';


interface IReplyForm {
    message: string;
}

interface ReplyWithUser extends Reply {
    user: { name: string; avatar: string; },
}

interface IAllReply {
    ok: boolean;
    replies: ReplyWithUser[]
}


const ReplyBox = () => {

    const router = useRouter();

    const { user } = useUser();
    const { register, handleSubmit, reset } = useForm<IReplyForm>();
    const { data, mutate } = useSWR<IAllReply>(router.query.id ? `/api/reply/allReply?postId=${router.query.id}` : "");

    const [replyCreate, { data: _, loading }] = useMutation("/api/reply/create");

    const onValid = ({ message }: IReplyForm) => {
        if (loading) return;
        if (!router.query.id) return;
        replyCreate({ postId: +(router.query.id), message });
        mutate((prev) => ({
            ...prev!,
            ok: true,
            replies: [
                ...(prev?.replies!),
                {
                    postId: +(router.query.id!), userId: user.id, id: -1, message, user: { name: user.name, avatar: user.avatar }
                }
            ]
        }), false);

        reset();
    }




    return (
        <div className="border-t-2 p-6 z-100 pb-28">
            <h1 className="text-lg font-semibold">댓글</h1>
            <ul className="mt-2 space-y-4 h-64 overflow-auto">
                {data?.replies.map(item =>
                    <li key={item.id}>
                        <div className="flex">
                            <div className="mr-2 w-7 h-7 relative rounded-full bg-white overflow-hidden ">
                                <Image layout="fill" objectFit='contain' src={`https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${item.user.avatar}/public`} />
                            </div>
                            <span className="text-sm font-semibold">{item.user.name}</span>
                        </div>
                        <div className="pl-9">
                            <p>{item.message}</p>
                            <div className="text-sm text-gray-400">{item.updatedAt}</div>
                        </div>
                    </li>
                )}
            </ul>
            <form onSubmit={handleSubmit(onValid)} className="border-t-2 pt-5 mt-5 ">
                <input {...register("message", { required: true })} className="rounded-2xl w-full border-2 p-3" type="text" placeholder="댓글을 입력해주세요" />
            </form>
        </div>
    )

}

export default ReplyBox;
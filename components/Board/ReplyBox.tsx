import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { Reply } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';


interface IReplyForm {
    message: string;
}

interface ReplyWithUser extends Reply {
    user: { name: string }
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
        replyCreate({ postId: router.query.id, message });
        mutate((prev) => ({
            ...prev,
            ok: true,
            replies: [
                ...prev?.replies!,
                {
                    postId: -1, userId: -1, id: -1, createdAt: new Date,
                    updatedAt: new Date, message, user: { name: user.name }
                }

            ]
        }), false);
        reset();
    }


    return (
        <div className="border-t-2 p-6 z-100 pb-28">
            <h1 className="text-lg font-semibold">댓글</h1>
            <ul className="mt-2 space-y-4 h-52 overflow-auto">
                {[1, 2, 3, 4, 5, 6].map(item =>
                    <li>
                        <div className="flex">
                            <div className="mr-2 w-7 h-7 rounded-full bg-gray-400" />
                            <span className="text-sm font-semibold">김명원</span>
                        </div>
                        <div className="pl-9">
                            <p>호우동 한번 찾아보겠습니다. 감사합니다.</p>
                            <div className="text-sm text-gray-400">9시간 전</div>
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
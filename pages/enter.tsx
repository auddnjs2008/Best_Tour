import useMutation from '@libs/client/useMutation';
import { NextPage } from 'next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface ILoginForm {
    email: string;
    password: string;
}


const Enter: NextPage = () => {
    const { handleSubmit, register } = useForm<ILoginForm>();
    const [mutation, { loading, data, error }] = useMutation("/api/users/enter");

    const onValid = (data: ILoginForm) => {
        mutation(data);
    }

    return (
        <div className="mx-auto max-w-sm p-10 mt-10 space-y-20 rounded-lg border-yellow-400 border-2 ">
            <h1 className="text-center font-semibold text-2xl">Welcome to Best_Tour</h1>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col ">
                <input {...register("email", { required: true })} className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="email" placeholder="Email Address" />
                <input  {...register("password", { required: true })} className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="password" placeholder="Password" />
                <button className="p-3 hover:bg-yellow-400 hover:text-white">Login</button>
            </form>
            <div>
                <Link href="/signup">
                    <a className="text-gray-500 cursor-pointer ">
                        아직 아이디가 없으세요?
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Enter;
import useMutation from '@libs/client/useMutation';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';


interface ISignUpResult {
    ok: boolean;
    token?: string;
    error?: string;
}
interface ITokenFirmResult {
    ok: boolean;
}

interface ILoginForm {
    email: string;
    password: string;
    passwordConfirm: string;
}
interface ITokenForm {
    token: string;
}

const SignUp: NextPage = () => {

    const [mutation, { loading, data, error }] = useMutation<ISignUpResult>("/api/users/signup");
    const [confirmToken, { loading: tokenLoading, data: tokenData, error: tokenError }] = useMutation<ITokenFirmResult>("/api/users/confirm");
    const { handleSubmit, register } = useForm<ILoginForm>();
    const { handleSubmit: tokenSubmit, register: tokenRegister } = useForm<ITokenForm>();
    const router = useRouter();

    const onValid = (info: ILoginForm) => {
        mutation(info);
        if (data && !data.ok) {
            alert(data!.error);
        }
    }

    const onTokenValid = (info: ITokenForm) => {
        const { token } = info;
        confirmToken({ token });
    }

    useEffect(() => {
        if (tokenData?.ok) {
            router.push("/placeStore");
        }
    }, [tokenData, router])

    return (
        <div className="mx-auto max-w-sm p-10 mt-10 space-y-16 rounded-lg border-yellow-400 border-2 ">
            <h1 className="text-center font-semibold text-2xl">Sign Up</h1>
            {data?.token ?
                <form onSubmit={tokenSubmit(onTokenValid)} className="flex flex-col ">
                    <input {...tokenRegister("token", { required: true })} value={data ? data!.token : ""} type="text" className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" />
                    <button className="p-3 hover:bg-yellow-400 hover:text-white">{tokenLoading ? "loading..." : "Sign up"}</button>
                </form>
                :
                <form onSubmit={handleSubmit(onValid)} className="flex flex-col ">
                    <input {...register("email", { required: true })} className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="email" placeholder="Email Address" />
                    <input {...register("password", { required: true })} className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="password" placeholder="Password" />
                    <input {...register("passwordConfirm", { required: true })} className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="password" placeholder="PasswordConfirm" />
                    <button className="p-3 hover:bg-yellow-400 hover:text-white">{loading ? "loading..." : "Sign Up"}</button>
                </form>
            }
            <div>
                <Link href="/enter">
                    <a className="text-gray-500 cursor-pointer ">
                        로그인 하러가기
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default SignUp;
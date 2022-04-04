import { NextPage } from 'next';
import Link from 'next/link';


const SignUp: NextPage = () => {
    return <div className="mx-auto max-w-sm p-10 mt-10 space-y-16 rounded-lg border-yellow-400 border-2 ">
        <h1 className="text-center font-semibold text-2xl">Sign Up</h1>
        <form className="flex flex-col ">
            <input className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="text" placeholder="Email Address" />
            <input className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="password" placeholder="Password" />
            <input className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="password" placeholder="PasswordConfirm" />
            <button className="p-3 hover:bg-yellow-400 hover:text-white">Sign Up</button>
        </form>
        <div>
            <Link href="/enter">
                <a className="text-gray-500 cursor-pointer ">
                    로그인 하러가기
                </a>
            </Link>
        </div>
    </div>
}

export default SignUp;
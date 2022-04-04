import { NextPage } from 'next';
import Link from 'next/link';

const Enter: NextPage = () => {
    return (
        <div className="mx-auto max-w-sm p-10 mt-10 space-y-20 rounded-lg border-yellow-400 border-2 ">
            <h1 className="text-center font-semibold text-2xl">Welcome to Best_Tour</h1>
            <form className="flex flex-col ">
                <input className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="text" placeholder="Email Address" />
                <input className="h-10 mb-5 p-3 outline-none rounded-lg focus:border-black focus:border-2" type="password" placeholder="Password" />
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
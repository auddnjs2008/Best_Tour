import Layout from '@components/Layout'
import useUser from '@libs/client/useUser'
import Image from 'next/image';
import Link from 'next/link';


const myProfile = () => {

    const { user } = useUser();

    return (
        <Layout>
            <div className="w-full">
                <div className="relative border-2 flex p-5">
                    {user?.avatar ?
                        <div className=" bg-slate-500 relative w-24 h-24 rounded-full mr-8 overflow-hidden">
                            <Image layout="fill" objectFit='cover' src={`https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${user.avatar}/public`} />
                        </div>
                        :
                        <div className="bg-slate-500 w-24 h-24 rounded-full mr-8" />
                    }
                    <div className=" flex flex-col justify-center">
                        <div className="font-semibold">{user?.name}</div>
                        <div className="text-sm">{user?.email}</div>
                    </div>
                    <Link href="/myProfile/fix" >
                        <a className="absolute right-3 bottom-3 text-sm ">Profile 수정하기</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default myProfile
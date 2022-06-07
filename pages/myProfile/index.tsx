import Layout from '@components/Layout'
import useUser from '@libs/client/useUser'
import client from '@libs/server/client';
import { Post } from '@prisma/client';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';


const MyProfile: NextPage = () => {

    const { user } = useUser();
    const router = useRouter();

    const { data: markerData } = useSWR("/api/markers/allMark");
    const { data: postData } = useSWR("/api/post/myPost");

    const onLogOut = () => {
        fetch("/api/users/logout",
            {
                method: "DELETE"
            }).then(result => result.json()).then(data => {
                if (data.ok) {
                    router.push("/enter");
                } else {
                    alert("로그아웃 실패");
                }
            }).catch((e) => {
                alert(`에러 발생 ${e}`);
            });
    }

    return (
        <Layout>
            <div className="w-full">
                <div className="relative border-2 flex p-5 border-yellow-500">
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
                    <button onClick={onLogOut} className="absolute right-32 bottom-3 text-sm">로그아웃</button>
                    <Link href="/myProfile/fix" >
                        <a className="absolute right-3 bottom-3 text-sm ">Profile 수정하기</a>
                    </Link>
                </div>
                <div className=" h-96 flex flex-col justify-center items-center space-y-10">
                    <div className="flex items-center space-x-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className=" text-yellow-500 h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className=""><span className="text-blue-500 font-bold text-[50px]">{markerData?.markers.length}</span>개</span>
                    </div>
                    <div className="flex items-center space-x-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span className=""><span className="text-[50px] text-blue-500 font-bold ">{postData?.posts.length}</span>개</span>
                    </div>
                </div>
            </div>
        </Layout>
    )
}




export default MyProfile
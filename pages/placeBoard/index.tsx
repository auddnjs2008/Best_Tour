
import PostBox from '@components/Board/PostBox';
import Layout from '@components/Layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const PlaceBoard: NextPage = () => {
    const router = useRouter();

    const onWriteClick = () => {
        router.push("/placeBoard/write");
    }
    return <Layout>
        <div className=" w-full h-full relative ">
            <header className=" z-10 bg-white fixed max-w-lg w-full top-0 text-center border-2 p-3 border-yellow-400">추천 장소들</header>
            <PostBox />
            <button onClick={onWriteClick} className="shadow-lg  absolute right-0 bottom-20  w-14 h-14 bg-blue-400 rounded-full border-2 border-black flex justify-center items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>
        </div>
    </Layout>
}

export default PlaceBoard;
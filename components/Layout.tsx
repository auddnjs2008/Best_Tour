import { RootState } from '@modules/index';
import { toggleWindow } from '@modules/LikeSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LikeWindow from './LikeWindow';


interface ILayout {
    children: React.ReactChild;
}

const Layout = ({ children }: ILayout) => {
    const router = useRouter();

    const { likeWindow } = useSelector((state: RootState) => state.like);
    const dispatch = useDispatch();

    const onLikeClick = () => {
        dispatch(toggleWindow());
    }

    return (
        <div className="  max-w-lg w-full h-full mx-auto ">
            {children}
            {likeWindow ? <LikeWindow></LikeWindow> : null}
            <nav className="bg-white fixed max-w-lg w-full bottom-1 flex justify-around align-middle border-2 border-yellow-400 p-4">
                <Link href={"/placeStore"}>
                    <a className={router.pathname === "/placeStore" ? "text-blue-500" : ""}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </a>
                </Link>
                <div onClick={onLikeClick} className={likeWindow ? "text-blue-500" : ""}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
                <Link href={"/placeBoard"}>
                    <a className={router.pathname === "/placeBoard" ? "text-blue-500" : ""}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </a>
                </Link>
                <Link href={"/myProfile"}>
                    <a className={router.pathname === "/myProfile" ? "text-blue-500" : ""}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </a>
                </Link>
            </nav>
        </div>
    )
}

export default Layout;
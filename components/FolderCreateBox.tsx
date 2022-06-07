import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface IFileForm {
    name: string;
    info: string;
}

interface IFolderCreateBox {
    onCloseFolderCreate: () => void
}

const FolderCreateBox = ({ onCloseFolderCreate }: IFolderCreateBox) => {

    const { register, handleSubmit } = useForm<IFileForm>();
    const [mutate, { data, loading }] = useMutation("/api/folder/create");

    const onValid = ({ name, info }: IFileForm) => {
        if (loading) return;
        mutate({ name, info });
    };

    useEffect(() => {
        if (data?.ok) {
            onCloseFolderCreate();
        }
    }, [data]);



    return (
        <div className="fixed w-full h-1/2 max-w-lg     bottom-1 z-40 space-y-2 bg-white border-2 border-blue-500 p-3">
            <header className="flex justify-between mb-10">
                <h1 className="text-lg font-semibold">새 폴더 추가</h1>
                <svg onClick={onCloseFolderCreate} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </header>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
                <input {...register("name", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" type="text" placeholder="폴더명을 입력해 주세요" />
                <input {...register("info", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" type="text" placeholder="설명을 입력해 주세요" />
                <button className=" translate-y-14 bg-blue-400 p-2 text-white">{loading ? "로딩중" : "완료"}</button>
            </form>

        </div>
    )
}

export default FolderCreateBox;
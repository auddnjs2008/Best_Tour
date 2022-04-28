import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


interface IEditProfile {
    name: string;
    email: string;
    avatar?: FileList;
}


const Fix = () => {
    const { user } = useUser();
    const router = useRouter();
    const { register, handleSubmit, watch } = useForm<IEditProfile>();
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar ? `https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${user.avatar}/public` : "");
    const [mutate, { data, loading }] = useMutation("/api/users/edit");
    const avatar = watch("avatar");

    const onValid = async ({ name, email, avatar }: IEditProfile) => {
        if (loading) return;


        if (avatar && avatar.length > 0) {
            const { uploadURL } = await (await fetch(`/api/files`)).json()
            const form = new FormData();
            form.append("file", avatar[0], user?.id + "");
            const { result: { id } } = await (await fetch(uploadURL, {
                method: "POST",
                body: form,
            })
            ).json();

            mutate({ name: name ? name : user.name, email: email ? email : user.email, avatar: id });
        } else {
            mutate({ name: name ? name : user.name, email: email ? email : user.email, avatar: user.avatar });
        }

    }

    useEffect(() => {
        if (avatar && avatar.length > 0) {
            const file = avatar[0];
            setAvatarPreview(URL.createObjectURL(file));
        }
    }, [avatar]);

    useEffect(() => {
        if (data && data.ok === true) {
            router.push("/myProfile");
        }
    }, [data])



    return (
        <div className="border-2 max-w-lg w-full h-full mx-auto p-3">
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-10 space-y-3">
                {avatarPreview ?
                    <div className="w-16 h-16 rounded-full relative border-2 border-slate-500 overflow-hidden">
                        <Image layout="fill" objectFit='cover' src={avatarPreview} ></Image>
                    </div>
                    :
                    <div className="w-14 h-14 rounded-full bg-slate-500"></div>
                }
                <label
                    htmlFor="picture"
                    className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
                >
                    Change
                    <input
                        {...register("avatar")}
                        id="picture"
                        type="file"
                        className="hidden"
                        accept="image/*"
                    />
                </label>
                <input {...register("name")} className="outline-none bg-gray-200 p-2 mb-2" placeholder="name" type="text" />
                <input {...register("email")} className="outline-none bg-gray-200 p-2 mb-2" placeholder="email" type="email" />
                <button className=" bg-blue-400 p-2 text-white">{loading ? "Loading..." : "Submit"}</button>
            </form>
        </div>
    )

}

export default Fix;
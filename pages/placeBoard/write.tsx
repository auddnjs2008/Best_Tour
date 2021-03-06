
import ImagesWindow from '@components/ImagesWindow';
import Layout from '@components/Layout';
import kakaoSearch from '@libs/client/kakaoSearch';
import useMap from '@libs/client/useMap';
import useMutation from '@libs/client/useMutation';
import { RootState } from '@modules/index';
import { openImageWindow } from '@modules/LikeSlice';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';


interface IPostForm {
    title: string;
    name: string;
    address: string;
    content: string;
    files: FileList;
}

interface IPostResponse {
    ok: boolean;
    newPost?: Post;
    error?: string;
}


const PostWrite = () => {


    const { register, handleSubmit, watch, resetField } = useForm<IPostForm>();
    const photos = watch("files");
    const dispatch = useDispatch();
    const [previewPhotos, setPreviewPhotos] = useState<string[] | null>(null);
    const [imageLoad, setImageLoad] = useState(false);
    const { imageWindow } = useSelector((state: RootState) => state.like);
    const [mutate, { data: postData, loading, error }] = useMutation<IPostResponse>("/api/post/create");
    const router = useRouter();

    const getImageId = (form: FormData, uploadURL: string) => {
        return fetch(uploadURL, { method: "POST", body: form }).then(res => res.json());
    }

    const submitAndStore = async (address_name: string, latitude: string, longitude: string, data: IPostForm) => {
        if (imageLoad || loading) return;

        if (previewPhotos && previewPhotos.length > 0) {
            setImageLoad(true);
            let fetchArr: any[] = [];
            for (let i = 0; i < photos.length; i++) {
                const fetchItem = fetch('/api/files').then(res => res.json());
                fetchArr.push(fetchItem);
            }
            const datas = await Promise.all(fetchArr);
            const idFetches: any[] = [];
            datas.forEach((data, i) => {
                const form = new FormData();
                form.append("file", photos[i], data.name);
                idFetches.push(getImageId(form, data.uploadURL));
            })

            const imageString = (await Promise.all(idFetches)).map(item => item.result.id).join(" ");
            setImageLoad(false);
            mutate({
                latitude, longitude, address: address_name, placeName: data.name, title: data.title, Message: data.content,
                imageUrls: imageString
            });
        } else {
            mutate({
                latitude, longitude, address: address_name, placeName: data.name, title: data.title, Message: data.content,
                imageUrls: ""
            });
        }
    }

    const isAddressValidAndStore = (data: IPostForm) => {

        const geocoder = new window.kakao.maps.services.Geocoder();


        const callback = function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                // ????????? ????????? ??????.

                if (result[0].road_address) {
                    const { road_address: { address_name, x, y } } = result[0];
                    submitAndStore(address_name, y, x, data);
                } else {
                    const { address_name, x, y } = result[0];
                    submitAndStore(address_name, y, x, data);
                }
            } else {
                alert("????????? ???????????? ???????????????. ????????? ????????? ?????? ????????????");
            }
        };


        geocoder.addressSearch(data.address, callback);
    }


    const onValid = async (data: IPostForm) => {
        if (imageLoad) return;
        window.kakao.maps.load(() => isAddressValidAndStore(data));
    }


    const onPreviewClick = () => {
        dispatch(openImageWindow());
    }

    useEffect(() => {
        if (photos && photos.length > 0) {

            if (photos.length > 4) {
                alert("????????? 4??? ???????????? ???????????????.");
                resetField("files");
                return;
            }
            const photoArr = Array.from(photos).map((item: Blob) => URL.createObjectURL(item));
            setPreviewPhotos(photoArr);
        }
    }, [photos])


    useEffect(() => {
        if (postData) {
            router.push(`/placeBoard/${postData.newPost?.id}`)
        }
    }, [postData])



    return (
        <Layout>
            <>
                <div className="">
                    <form onSubmit={handleSubmit(onValid)} className="flex flex-col pt-10">
                        <input {...register("title", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" placeholder="Title" />
                        <input {...register("name", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" placeholder=" Place_Name"></input>
                        <input {...register("address", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" placeholder="Place_Address"></input>
                        <label className=" text-black bg-yellow-400 mb-3 p-2">
                            ???????????? ???????????????
                            <input {...register("files")} className="hidden" type="file" accept="image/*" multiple={true} />
                        </label>
                        {previewPhotos && previewPhotos.length > 0 ?
                            <button type="button" onClick={onPreviewClick} className="ring-yellow-400 ring-2 p-3 mb-3"> ????????? ????????????</button>
                            :
                            null
                        }
                        <textarea {...register("content", { required: true })} className="border-2 h-[150px] resize-none mb-5 outline-none p-3"></textarea>
                        <button className=" bg-blue-400 p-2 text-white">{imageLoad || loading ? "Loading..." : "Submit"}</button>
                    </form>
                </div>
                {imageWindow ? <ImagesWindow images={previewPhotos!} /> : null}
            </>
        </Layout>
    )
}

export default PostWrite;
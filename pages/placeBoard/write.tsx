
import Layout from '@components/Layout';
import useMutation from '@libs/client/useMutation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


interface IPostForm {
    title: string;
    name: string;
    address: string;
    content: string;
    files: FileList;
}


const PostWrite = () => {

    const { register, handleSubmit, watch, resetField } = useForm<IPostForm>();
    const photos = watch("files");
    const [previewPhotos, setPreviewPhotos] = useState<string[] | null>(null);
    const [imageLoad, setImageLoad] = useState(false);

    const [mutate] = useMutation("/api/post/create");

    const getImageId = (form: FormData, uploadURL: string) => {
        return fetch(uploadURL, { method: "POST", body: form }).then(res => res.json());
    }

    const submitAndStore = async (address_name: string, latitude: string, longitude: string) => {
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
            // 포스터 저장 필요
            // latitude,longitude,address,placeName,title,Message,,imageUrls;
        }
    }

    const isAddressValidAndStore = (address: string, name: string) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const callback = function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                // 전송을 해줘야 한다.
                const { road_address: { address_name, x, y } } = result;
                submitAndStore(address_name, y, x);
            } else {
                alert("장소를 발견하지 못했습니다. 주소나 이름을 다시 써주세요");
            }
        };

        geocoder.addressSearch(address + ` ${name}`, callback);
    }


    const onValid = async (data: IPostForm) => {
        if (imageLoad) return;
        isAddressValidAndStore(data.address, data.name);
    }


    const onPreviewClick = () => {

    }

    useEffect(() => {
        if (photos && photos.length > 0) {

            if (photos.length > 4) {
                alert("사진은 4장 이하까지 가능합니다.");
                resetField("files");
                return;
            }
            const photoArr = Array.from(photos).map((item: Blob) => URL.createObjectURL(item));
            setPreviewPhotos(photoArr);
        }
    }, [photos])

    return (
        <Layout>
            <div className="">
                <form onSubmit={handleSubmit(onValid)} className="flex flex-col pt-10">
                    <input {...register("title", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" placeholder="Title" />
                    <input {...register("name", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" placeholder=" Place_Name"></input>
                    <input {...register("address", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" placeholder="Place_Address"></input>
                    <label className=" text-black bg-yellow-400 mb-3 p-2">
                        이미지를 올려주세요
                        <input {...register("files")} className="hidden" type="file" accept="image/*" multiple={true} />
                    </label>
                    {previewPhotos && previewPhotos.length > 0 ?
                        <button type="button" onClick={onPreviewClick} className="ring-yellow-400 ring-2 p-3 mb-3"> 이미지 미리보기</button>
                        :
                        null
                    }
                    <textarea {...register("content", { required: true })} className="border-2 h-[150px] resize-none mb-5 outline-none p-3"></textarea>
                    <button className=" bg-blue-400 p-2 text-white">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default PostWrite;
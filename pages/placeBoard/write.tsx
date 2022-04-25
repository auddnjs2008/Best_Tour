import Layout from '@components/Layout';

const PostWrite = () => {

    return (
        <Layout>
            <div>
                <form className="flex flex-col">
                    <input className="outline-none bg-gray-200 p-2 mb-2" placeholder="Title" />
                    <input className="outline-none bg-gray-200 p-2 mb-2" placeholder=" Place_Name"></input>
                    <label className=" text-black bg-yellow-400 mb-7 p-2">
                        이미지를 올려주세요
                        <input className="hidden" type="file" accept="image/*" multiple={true} />
                    </label>
                    <textarea></textarea>
                </form>
            </div>
        </Layout>
    )
}

export default PostWrite;
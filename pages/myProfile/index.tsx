import Layout from '@components/Layout'
import useUser from '@libs/client/useUser'


const myProfile = () => {

    const { user } = useUser();


    return (
        <Layout>
            <div className="w-full">
                <div className="border-2 flex p-5">
                    <div className="bg-slate-500 w-24 h-24 rounded-full mr-8" />
                    <div className=" flex flex-col justify-center">
                        <div className="font-semibold">{user?.name}</div>
                        <div className="text-sm">{user?.email}</div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default myProfile
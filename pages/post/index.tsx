import { NextPage } from 'next';


const Postes: NextPage = () => {

    return (
        <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => <div>게시물입니다.</div>)}
        </div>
    )

}

export default Postes
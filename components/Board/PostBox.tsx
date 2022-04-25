import Post from './Post';

const PostBox = () => {

    return (
        <ul className="mt-16">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => <Post></Post>)}
        </ul>
    )
}

export default PostBox;
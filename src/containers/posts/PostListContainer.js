import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/post/PostList';
import { listPosts } from '../../modules/posts';
import { useParams, useSearchParams } from 'react-router-dom';

export default function PostListContainer() {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      loading: loading['posts/LIST_POSTS'],
      error: posts.error,
      user: user.user,
    }),
  );

  useEffect(() => {
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page'), 10) || 1;

    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, searchParams, username]);
  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
}

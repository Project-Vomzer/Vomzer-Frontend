import { useState, useEffect } from 'react';
import Post from '../post/Post';
import CreatePost from '../createPost/CreatePost';

const ProfileFeed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/posts?userId=${userId}`);
      const data = await response.json();
      setPosts(data.posts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const handleNewPost = () => {
    fetchPosts(); // Refresh after new post
  };

  return (
    <div className="space-y-4">
      <CreatePost onPostCreated={handleNewPost} />
      
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse h-40" />
          ))}
        </div>
      ) : (
        posts.map(post => (
          <Post key={post.id} post={post} />
        ))
      )}
    </div>
  );
};
export default ProfileFeed;
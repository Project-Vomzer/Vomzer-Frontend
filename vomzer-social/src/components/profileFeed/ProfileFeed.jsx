import { useState, useEffect } from 'react';
// import Post from '../post/Post';
import CreatePost from '../createPost/CreatePost';

const ProfileFeed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const fetchPosts = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await fetch(`/api/posts?userId=${userId}`);
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch posts: ${response.statusText}`);
  //     }
  //     const data = await response.json();
  //     console.log('Fetched posts data:', data); // Debug log
  //     // Ensure data.posts is an array; adjust based on actual API response
  //     const postsArray = Array.isArray(data.posts) ? data.posts : data;
  //     if (!Array.isArray(postsArray)) {
  //       throw new Error('Posts data is not an array');
  //     }
  //     setPosts(postsArray);
  //   } catch (err) {
  //     console.error('Error fetching posts:', err);
  //     setError('Failed to load posts. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, [userId]);

  const handleNewPost = async (newPost) => {
    console.log('New post created:', newPost); // Debug log
    // Optimistic update: Add the new post immediately
    setPosts(prevPosts => [newPost, ...prevPosts]);
    // Fetch posts after a slight delay to ensure API consistency
    // setTimeout(fetchPosts, 1000);
    setLoading(false);
  };

  // useEffect(() => {
  //   console.log('Current posts state:', posts); // Debug log
  // }, [posts]);


  console.log(posts)

  return (
    <div className="space-y-4">
      <CreatePost onPostCreated={handleNewPost} />
      {/* {
         posts.map(post => (
          // <Post key={post.id} post={post} />
          <h1>{post.content}</h1>
        ))
      } */}
      
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse h-40" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-gray-500 text-center">No posts available.</div>
      ) : 
      (        
        posts.map((post,i) => (
          <div key={i}  className="bg-white p-4 rounded-lg shadow h-40">
            {/* <Post key={post.id} post={post} /> */}
            <h1>{post.content}</h1>
          </div>
  
        ))
      )
      }
    </div>
  );
};

export default ProfileFeed;


// import { useState, useEffect } from 'react';
// import Post from '../post/Post';
// import CreatePost from '../createPost/CreatePost';

// const ProfileFeed = ({ userId }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch(`/api/posts?userId=${userId}`);
//       const data = await response.json();
//       setPosts(data.posts);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [userId]);

//   const handleNewPost = () => {
//     fetchPosts(); 
//   };

//   return (
//     <div className="space-y-4">
//       <CreatePost onPostCreated={handleNewPost} />
      
//       {loading ? (
//         <div className="space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse h-40" />
//           ))}
//         </div>
//       ) : (
//         posts.map(post => (
//           <Post key={post.id} post={post} />
//         ))
//       )}
//     </div>
//   );
// };
// export default ProfileFeed;
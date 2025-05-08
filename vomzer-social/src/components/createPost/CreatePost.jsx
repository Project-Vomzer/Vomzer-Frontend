import { useState, useRef } from 'react';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  console.log(content)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      let mediaUrl = '';
      if (media) {
        const formData = new FormData();
        formData.append('file', media);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        console.log('Upload response status:', res.status, res.statusText); // Debug
        const text = await res.text(); // Read as text first
        console.log('Upload response body:', text); // Debug
        if (!res.ok) throw new Error(`Media upload failed: ${text || res.statusText}`);
        let data;
        try {
          data = JSON.parse(text); // Attempt to parse as JSON
        } catch (parseError) {
          throw new Error('Invalid JSON response from upload: ' + text);
        }
        mediaUrl = data.url;
      }

      const postData = {
        content,
        media: mediaUrl,
        hashtags: content.match(/#\w+/g) || [],
        timestamp: new Date().toISOString(),
      };

      console.log('Post data:', postData); // Debug

      // const postRes = await fetch('/api/posts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(postData),
      // });
      // console.log('Post response status:', postRes.status, postRes.statusText); // Debug
      // const postText = await postRes.text(); // Read as text first
      // console.log('Post response body:', postText); // Debug
      // if (!postRes.ok) throw new Error(`Failed to create post: ${postText || postRes.statusText}`);
      // let newPost;
      // try {
      //   newPost = JSON.parse(postText); // Attempt to parse as JSON
      //   console.log('New post created:', newPost); // Debug
      // } catch (parseError) {
      //   throw new Error('Invalid JSON response from post creation: ' + postText);
      // }

      onPostCreated(postData); // Pass the new post to the parent
      setContent('');
      setMedia(null);
      fileInputRef.current.value = null; // Reset file input
    } catch (error) {
      console.error('Error creating post:', error);
      alert(`Failed to create post: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="What's happening?"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        {media && (
          <div className="mt-2 relative">
            {media.type.startsWith('image/') ? (
              <img 
                src={URL.createObjectURL(media)} 
                alt="Preview" 
                className="max-h-60 rounded-lg object-cover"
              />
            ) : (
              <video 
                src={URL.createObjectURL(media)} 
                controls 
                className="max-h-60 rounded-lg"
              />
            )}
            <button
              type="button"
              onClick={() => setMedia(null)}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white p-1 rounded-full"
            >
              ✕
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="p-2 text-gray-500 hover:text-blue-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setMedia(e.target.files[0])}
                accept="image/*, video/*"
                className="hidden"
              />
            </button>
          </div>
          <div>
            <div className="sticky top-16 z-10 bg-white bg-opacity-90 border-b border-gray-200">
              <div className="flex overflow-x-auto px-4">
                {['Photo', 'Video', 'News', 'Threads'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                      tab === 'Photo' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={!content || isUploading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            {isUploading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;


// import { useState, useRef } from 'react';

// const CreatePost = ({ onPostCreated }) => {
//   const [content, setContent] = useState('');
//   const [media, setMedia] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsUploading(true);
    
//     try {
      
//       let mediaUrl = '';
//       if (media) {
//         const formData = new FormData();
//         formData.append('file', media);
        
//         const res = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData
//         });
//         const data = await res.json();
//         mediaUrl = data.url;
//       }

//       const postData = {
//         content,
//         media: mediaUrl,
//         hashtags: content.match(/#\w+/g) || [],
//         timestamp: new Date().toISOString()
//       };

//       await fetch('/api/posts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(postData)
//       });

//       onPostCreated(); 
//       setContent('');
//       setMedia(null);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow mb-4">
//       <form onSubmit={handleSubmit}>
//         <textarea
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="What's happening?"
//           rows="3"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
        
//         {media && (
//           <div className="mt-2 relative">
//             {media.type.startsWith('image/') ? (
//               <img 
//                 src={URL.createObjectURL(media)} 
//                 alt="Preview" 
//                 className="max-h-60 rounded-lg object-cover"
//               />
//             ) : (
//               <video 
//                 src={URL.createObjectURL(media)} 
//                 controls 
//                 className="max-h-60 rounded-lg"
//               />
//             )}
//             <button
//               type="button"
//               onClick={() => setMedia(null)}
//               className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white p-1 rounded-full"
//             >
//               ✕
//             </button>
//           </div>
//         )}
        
//         <div className="flex justify-between items-center mt-3">
//           <div className="flex space-x-2">
//             <button
//               type="button"
//               onClick={() => fileInputRef.current.click()}
//               className="p-2 text-gray-500 hover:text-blue-500"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={(e) => setMedia(e.target.files[0])}
//                 accept="image/*, video/*"
//                 className="hidden"
//               />
//             </button>
//           </div>
//           <div>
//           <div className="sticky top-16 z-10 bg-white bg-opacity-90 border-b border-gray-200">
//                             <div className="flex overflow-x-auto px-4">
//                                 {['Photo', 'Video', 'News', 'Threads'].map((tab) => (
//                                     <button
//                                         key={tab}
//                                         className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
//                                             tab === 'Photo' 
//                                                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                                                 : 'text-gray-500 hover:bg-gray-50'
//                                         }`}
//                                     >
//                                         {tab}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//           </div>
//           <button
//             type="submit"
//             disabled={!content || isUploading}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
//           >
//             {isUploading ? 'Posting...' : 'Post'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default CreatePost;
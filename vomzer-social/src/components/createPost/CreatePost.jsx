import { useState, useRef } from 'react';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      // 1. Upload media to IPFS/Cloudinary if exists
      let mediaUrl = '';
      if (media) {
        const formData = new FormData();
        formData.append('file', media);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        mediaUrl = data.url;
      }

      // 2. Submit post to blockchain/backend
      const postData = {
        content,
        media: mediaUrl,
        hashtags: content.match(/#\w+/g) || [],
        timestamp: new Date().toISOString()
      };

      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      onPostCreated(); // Refresh feed
      setContent('');
      setMedia(null);
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
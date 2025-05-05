const Post = ({ post }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-bold">VOMZER</span>
              <span className="text-gray-500">@vomzer</span>
              <span className="text-gray-500">· {post.time}</span>
            </div>
            <p className="mt-1">{post.content}</p>
            
            {post.media && (
              <div className="mt-3">
                {post.media.type.startsWith('image') ? (
                  <img 
                    src={post.media.url} 
                    alt="Post media" 
                    className="rounded-lg max-h-96 w-full object-cover"
                  />
                ) : (
                  <video 
                    src={post.media.url} 
                    controls 
                    className="rounded-lg max-h-96 w-full"
                  />
                )}
              </div>
            )}
            
            <div className="mt-2 flex flex-wrap gap-1">
              {post.hashtags.map((tag, i) => (
                <span key={i} className="text-blue-500">#{tag}</span>
              ))}
            </div>
            
            <div className="flex justify-between mt-3 text-gray-500 max-w-md">
              <span>{post.stats.likes.toLocaleString()}</span>
              <span>{post.stats.comments.toLocaleString()}</span>
              <span>{post.stats.reposts.toLocaleString()}</span>
              <span>{post.stats.shares.toLocaleString()}</span>
              <span>Views: {post.stats.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Post;
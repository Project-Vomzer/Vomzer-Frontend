// const Post = ({ post }) => (
//   <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
//     <div className="flex gap-3">
//       <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full" />
//       <div className="flex-1">
//         <div className="flex items-center gap-1">
//           <span className="font-bold">VOMZER</span>
//           <span className="text-gray-500">@vomzer</span>
//           <span className="text-gray-500">· 1h</span>
//         </div>
//         <p className="mt-1">{post.content}</p>
//         <div className="mt-2 flex gap-2">
//           {post.hashtags.map((tag, i) => (
//             <span key={i} className="text-blue-600">#{tag}</span>
//           ))}
//         </div>
//         <div className="flex justify-between mt-3 text-gray-500 max-w-md">
//           <span>{post.stats.likes.toLocaleString()}</span>
//           <span>{post.stats.comments.toLocaleString()}</span>
//           <span>{post.stats.reposts.toLocaleString()}</span>
//           <span>{post.stats.shares.toLocaleString()}</span>
//           <span>Views: {post.stats.views.toLocaleString()}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Post;
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// In-memory storage for posts (resets on server restart)
let posts = ["mine", "you"];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/binance': {
        target: 'https://api.binance.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/binance/, '/api/v3'),
        configure: (proxy) => {
          proxy.on('error', (err) => console.error('Proxy error:', err));
          proxy.on('proxyReq', (proxyReq) => console.log('Proxying to:', proxyReq.getHeader('host')));
        },
      },
      '/api/coingecko': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/coingecko/, '/api/v3'),
      },
    },
    middleware: [
      (req, res, next) => {
        // Mock /api/upload (POST)
        if (req.url === '/api/upload' && req.method === 'POST') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ url: 'https://via.placeholder.com/150' }));
        }
        // Mock /api/posts (POST)
        else if (req.url === '/api/posts' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const postData = JSON.parse(body);
              const newPost = {
                id: Date.now().toString(),
                content: postData.content,
                media: postData.media || '',
                hashtags: postData.hashtags || [],
                timestamp: postData.timestamp,
                stats: { likes: 0, comments: 0, reposts: 0, shares: 0, views: 0 },
              };
              posts.push(newPost); // Store the post
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(newPost));
            } catch (error) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
          });
        }
        // Mock /api/posts (GET)
        else if (req.url.startsWith('/api/posts?userId=') && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ posts })); // Return stored posts
        }
        // Pass to next middleware (including proxy) if not handled
        else {
          next();
        }
      },
    ],
  },
});

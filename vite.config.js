import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function paymentGatewayCallbackPlugin() {
  const handler = (req, res, next) => {
    // Check for POST to payment callback routes or checkout routes
    const url = req.url || '';
    if (req.method === 'POST' && (url.startsWith('/checkout') || url.includes('/callback'))) {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const bodyParams = new URLSearchParams(body);
          const [urlPath, existingQuery] = url.split('?');
          const finalParams = new URLSearchParams(existingQuery || '');
          
          for (const [key, value] of bodyParams.entries()) {
            finalParams.set(key, value);
          }
          
          const queryString = finalParams.toString();
          const targetUrl = urlPath + (queryString ? `?${queryString}` : '');
          
          // 303 See Other redirects POST request into a GET request
          res.writeHead(303, { Location: targetUrl });
          res.end();
        } catch (err) {
          res.writeHead(303, { Location: url });
          res.end();
        }
      });
      return;
    }
    next();
  };

  return {
    name: 'payment-gateway-callback-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    paymentGatewayCallbackPlugin(),
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // or '0.0.0.0' to expose on local IP / network
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})


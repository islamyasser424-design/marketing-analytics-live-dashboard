const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, notFoundHtml);
  console.log('Successfully copied dist/index.html to dist/404.html for GitHub Pages SPA routing.');
} else {
  console.warn('dist/index.html not found, skipped copy-404.');
}

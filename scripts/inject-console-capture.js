const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), '.next', 'server', 'app');

function injectScript(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`✓ Already injected: ${filePath}`);
    return;
  }
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  const headEndTag = '</head>';
  
  if (content.includes(headEndTag)) {
    const updatedContent = content.replace(headEndTag, `${scriptTag}${headEndTag}`);
    fs.writeFileSync(filePath, updatedContent);
    console.log(`✓ Injected: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(outDir)) {
  console.log('Injecting console capture script...');
  walkDir(outDir);
  console.log('Done!');
} else {
  console.log('Build output not found. Skipping injection.');
}
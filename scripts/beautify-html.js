const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

// Paths to scan for compiled next.js output HTML files
const searchDirs = [
  path.join(__dirname, '../out'),
  path.join(__dirname, '../.next/server/app')
];

async function beautifyHtmlFiles() {
  console.log('✨ Starting HTML View-Source Beautification...');
  
  let count = 0;
  for (const dir of searchDirs) {
    if (fs.existsSync(dir)) {
      count += await processDirectory(dir);
    }
  }
  
  console.log(`\n✅ Completed! Beautifully formatted ${count} HTML production output pages.`);
}

async function processDirectory(currentDir) {
  let processedCount = 0;
  const files = fs.readdirSync(currentDir);
  
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processedCount += await processDirectory(fullPath);
    } else if (file.endsWith('.html')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Let's use prettier API to format the HTML output nicely
        const formatted = await prettier.format(content, {
          parser: 'html',
          printWidth: 120,
          tabWidth: 2,
          htmlWhitespaceSensitivity: 'ignore'
        });
        
        fs.writeFileSync(fullPath, formatted, 'utf8');
        console.log(`   Formatted: ${path.relative(path.join(__dirname, '..'), fullPath)}`);
        processedCount++;
      } catch (err) {
        console.warn(`   ⚠️ Failed to format ${file}: ${err.message}`);
      }
    }
  }
  return processedCount;
}

beautifyHtmlFiles().catch(console.error);

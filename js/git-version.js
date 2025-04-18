#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// Get current git commit hash
let commitHash;
try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (error) {
  console.error('Error getting git commit hash:', error.message);
  process.exit(1);
}

// Create or update the version info in main.js
const versionCode = `// Git commit info - Auto-generated, do not edit manually
const GIT_COMMIT_HASH = '${commitHash}';
const GIT_REPO_URL = 'https://github.com/anu-physical-therapy/web/commit/';
`;

// Read current main.js file
const mainJsPath = './js/main.js';
let mainJsContent;

try {
  mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
} catch (error) {
  console.error(`Error reading ${mainJsPath}:`, error.message);
  process.exit(1);
}

// Check if file already has version info
if (mainJsContent.includes('// Git commit info')) {
  // Replace existing version info
  mainJsContent = mainJsContent.replace(
    /\/\/ Git commit info.*?const GIT_REPO_URL.*?;/s,
    versionCode.trim()
  );
} else {
  // Add version info at the beginning
  mainJsContent = versionCode + mainJsContent;
}

// Write updated content back to file
try {
  fs.writeFileSync(mainJsPath, mainJsContent);
  console.log(`Updated ${mainJsPath} with commit hash: ${commitHash}`);
} catch (error) {
  console.error(`Error writing to ${mainJsPath}:`, error.message);
  process.exit(1);
}
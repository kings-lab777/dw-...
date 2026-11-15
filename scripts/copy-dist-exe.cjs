const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../dist-package/win-unpacked/DigiWorku Commander.exe');
const dest = path.join(__dirname, '../dist/DigiWorku-Commander-Setup.exe');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Successfully created Windows Desktop Executable: dist/DigiWorku-Commander-Setup.exe');
} else {
  console.error('Source binary not found at:', src);
}

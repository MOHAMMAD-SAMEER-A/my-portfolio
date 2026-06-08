const fs = require('fs');
try {
  console.log('LOCAL BIN:', fs.readdirSync('/Users/mdsameer/.local/bin'));
} catch (e) {
  console.error('ERROR:', e.message);
}

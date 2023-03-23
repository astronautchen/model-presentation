const fs = require('fs');
const process = require('child_process');
function write() {
  let version = require('./package.json').version;
  process.exec('git rev-parse --abbrev-ref HEAD', (error, stdout) => {
    if (!error) {
      fs.writeFile('./public/version.txt', `branch:${stdout}version:${version}`, function (err) {
        if (err) console.error(err);
      });
      fs.writeFile('./.env', `VITE_VUE_APP_VERSION = ${version}`, function (err) {
        if (err) console.error(err);
      });
    } else {
      // 失败
      console.log('error', error);
    }
  });
}
write();

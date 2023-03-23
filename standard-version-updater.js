const child_process = require('child_process');
module.exports.readVersion = function () {
  return require('./package.json').version;
};

module.exports.writeVersion = function (contents, version) {
  const branch = child_process.execSync('git branch --show-current');
  return `VITE_VUE_APP_VERSION = ${version} \nVITE_VUE_APP_BRANCH = ${branch}`;
};

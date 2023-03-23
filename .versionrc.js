const tracker = {
  filename: './.env',
  updater: require('./standard-version-updater.js')
};

module.exports = {
  bumpFiles: [
    {
      filename: './package.json',
      // `json` 更新程序假定版本在 `version 下可用` 提供的 JSON 文档中的键。
      type: 'json'
    },
    tracker
  ],
  packageFiles: [tracker]
};

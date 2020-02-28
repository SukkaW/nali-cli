const { existsSync } = require('fs');
const { qqwryDataPath } = require('./const');

module.exports = (fn) => {
  if (!existsSync(qqwryDataPath)) {
    const { downloadQqwry } = require('./qqwryUpdate');
    downloadQqwry(qqwryDataPath);
  } else {
    fn();
  }
}

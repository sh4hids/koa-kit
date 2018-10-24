const chalk = require('chalk');

function printStartMessage(port) {
  return chalk`{greenBright
----------------------------
{blueBright Server starting on port ${port}}
----------------------------
}`;
}

module.exports = {
  printStartMessage,
};

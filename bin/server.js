const { appPort } = require('../app/config');
require('../app/config/db.config');
const messages = require('../app/helpers/messages');
const app = require('../app');

app.listen(appPort, () => {
  console.log(messages.printStartMessage(appPort));
});

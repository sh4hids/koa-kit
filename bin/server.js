const env = process.env.NODE_ENV || 'development';
const { serverPort } = require('../app/config');
const db = require('../app/config/db.config');
const messages = require('../app/helpers/messages');
const app = require('../app');

const port = serverPort || 8000;

app.listen(port, () => {
  console.log(messages.printStartMessage(port));
});

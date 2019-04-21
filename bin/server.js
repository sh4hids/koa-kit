const env = process.env.NODE_ENV || 'development';
const app = require('../app');
const { serverPort } = require('../app/config');
const messages = require('../app/helpers/messages');

const port = serverPort || 8000;

app.listen(port, () => {
  console.log(messages.printStartMessage(port));
});

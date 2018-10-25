const env = process.env.NODE_ENV || 'development';
const app = require('../app');
const config = require('../app/config')[env];
const messages = require('../app/helpers/messages');

const port = config.port || 8000;

app.listen(port, () => {
  console.log(messages.printStartMessage(port));
});

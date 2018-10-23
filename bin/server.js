const env = process.env.NODE_ENV || 'development';
const app = require('../app');
const config = require('../app/config')[env];

const port = config.port || 8000;

app.listen(port, () => {
  console.log(`API server started on port ${port}`);
});

const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3333;

app.listen(3333, () => console.log('server running or port 3333'));
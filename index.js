const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('./middlewares/cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');
const pagesRouter = require('./routes/pages');

const connectToDatabase = require('./database/connect');

const PORT = 3001;
const app = express();

connectToDatabase();

app.use(
    cors,
    cookieParser(),
    bodyParser.json(),
    pagesRouter,
    apiRouter,
    express.static(path.join(__dirname, 'public')),
);

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});
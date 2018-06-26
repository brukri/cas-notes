import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {notesRoutes} from './notesRoutes';

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

const app = express();

app.use(allowCrossDomain);
app.use(express.static(path.resolve('./server/public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/notes", notesRoutes);

const hostname = 'localhost';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
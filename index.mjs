import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {notesRoutes} from './routes/notesRoutes';

const app = express();

app.use(express.static(path.resolve('public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/notes", notesRoutes);


//app.use(require('./routes/orderRoutes.js'));
app.use(express.static(path + '/public'));

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
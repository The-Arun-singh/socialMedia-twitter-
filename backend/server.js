import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import portfinder from 'portfinder';
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

global.__basedir = dirname(fileURLToPath(import.meta.url));

const app = express();


mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to mongodb'))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());


portfinder.getPort((err, port) => {
    if (err) throw err;
    app.listen(port, () => console.log(`listening on : http://localhost:${port}`));
})
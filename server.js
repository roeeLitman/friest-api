import express from "express";
import amn from './anm.controler.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

app.use(express.json())
app.use('/amn', amn)

// const mw = (req, res, next) => { 
//     console.log(`${req.method}: ${req.url}`);
//     next()
// }

const port = 7700;


app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.listen(port, () => {
  console.log(`server listen to ${port} port. visit http://localhost:${port}`);
});



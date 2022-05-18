import express from 'express';
import axios from 'axios';
import { createReadStream, createWriteStream } from 'fs';
import { request } from 'http';

const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/main', function (req, res) {
    res.sendFile('C:/Users/user/Documents/GitHub/Homework3/register.html')
});
  
  // POST method route
app.post('/main', function (req, res) {
    let answer = await req.body;
    const input = createWriteStream('test.txt');
    answer.pipe(input);
});

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});


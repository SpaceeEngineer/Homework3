import express from 'express';
import axios from 'axios';
import fs from 'fs';

const app = express();
const port = process.env.port || 3000;
const rewdata = fs.readFileSync('data.json');
const users = JSON.parse(rewdata);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log(users);

const middlewr = async (req, res, next) => {
  // const reqOptions = {
  //   method: 'get',
  //   //headers: { authorization: `Bearer ${accessToken}` },
  // }
  // const weatherResponse = await axios(reqOptions);
  // req.weather = weatherResponse.data;
  // console.log(req.headers['host']);
  // res.setHeader('User', 'Mikhailo');  
  next();
}

app.get('/', middlewr, (req, res) => {
  res.end('Hello');
})

app.post('/registration', middlewr, (req, res) => {
    console.log(req.body);
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let user1 = {
    name: "Molecule Madam",
    password: "12345",
}
let rrrr;
let json;

function checkUser (user, pass) {
    users.map(data => {
        if (data.name == user && data.secretIdentity == pass){
            return rrrr = 1;
        } else {
            rrrr = 0;
        }
    })
}

checkUser(user1.name, user1.password);

if (rrrr == 0){
    users[users.length] = user1;
    console.log(users);
    fs.writeFileSync("data.json", JSON.stringify(users));

}
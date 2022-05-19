import express from 'express';
import nodemailer from 'nodemailer';
import fs from 'fs';
import { createGzip } from 'zlib';

const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true}));
// app.use(express.json());

app.get('/main', function (req, res) {
    res.sendFile('C:/Users/user/Documents/GitHub/Homework3/register.html')
});
  
  // POST method route
app.post('/main', function (req, res) {
    fs.appendFile("test.txt","Name: " + req.body.userName + " Age: " + req.body.userAge + "\n", (error) => {
        if(error) throw error;
        res.end("Data is saved");
    });
    
});

app.get('/allusers', function (req, res) {
    fs.createReadStream("test.txt").pipe(res);
})

app.get('/sendzip', function (req, res) {
    const out = fs.createReadStream("test.txt");
    const inp = fs.createWriteStream('test.txt.gz');
    const czip = createGzip();
    out.pipe(czip).pipe(inp);

    sendMail().catch(console.error);
    res.end("ZIP was send");
});

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});

async function sendMail() {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user, 
          pass: testAccount.pass, 
        },
      });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
        attachments: [
            {
                filename: "test.txt.gz",
            }
        ]
      });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
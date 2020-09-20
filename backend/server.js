const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

require('dotenv').config();
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD
//   }
// });

// let mailOptions = {
//   from:'christian.chan@gmail.com',
//   to: 'christianyes325@gmail.com',
//   subject: 'Testing and Tesitng',
//   text: 'it works'
// };

// transporter.sendMail(mailOptions, function(err, data){
//   if(err){
//     console.log('error occurs');
//   }else {
//     console.log('email sent');
//   }
// });


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.post('/email', (req, res) =>{
  //send email here
  res.json({ message: 'Message Recieved' })
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');

app.use('/events', eventsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
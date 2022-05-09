const express=require('express')
const morgan=require('morgan')
require("dotenv").config()
const database=require('./config/database')
const router=require('./routes/user')
var path = require('path');
var cors = require('cors')

const app=express()
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));

database.connect()

app.use('/',router)

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send({message:err.message});
});

const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`Server run at port ${port}`);
})

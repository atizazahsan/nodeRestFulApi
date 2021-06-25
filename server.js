const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

const productRoute = require('./routes/products');
const orderRoute = require('./routes/orders');


const PORT = process.env.PORT || 8000 ; 

const URI = 'mongodb://dbAdmin:pakistan905@cluster0-shard-00-00.ddgjv.mongodb.net:27017,cluster0-shard-00-01.ddgjv.mongodb.net:27017,cluster0-shard-00-02.ddgjv.mongodb.net:27017/studentApp?ssl=true&replicaSet=atlas-gmlpir-shard-0&authSource=admin&retryWrites=true&w=majority'

// DB connection

mongoose.connect(URI , { useUnifiedTopology: true  , useNewUrlParser : true })
        .then( () => app.listen(PORT , () => console.log(`App is running on Port ${PORT} and database is connected` )) )
        .catch((err) => console.log(err))


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res , next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-headers' , 'Origin , X-Requested-With , Content-Type , Accept , Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT , POST , PATCH , DELETE , GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/products' , productRoute);
app.use('/orders' , orderRoute);

app.use((req, res , next) => {
    const error = new Error("Not Found") ;
    error.status = 404 ;
    next(error);
})

app.use((error , req , res , next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

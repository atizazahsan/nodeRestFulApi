const express = require('express');
const mongoose  = require('mongoose');
const route = express.Router();

const Order = require('../model/order');

route.get('/' , (req, res, next) => {
    Order.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            message : "All orders has been fetched" ,
            orders : docs
        })
    })
    .catch( err => {
        res.status(500).json({
            error : err
        })
    })
})
// Show all Orders

route.post('/' , (req , res , next) => {
    const order = new Order({
       _id : mongoose.Types.ObjectId(),
       quantity : req.body.quantity ,
       product : req.body.productId
   })

   order.save()
   .then(result =>{
       console.log(result);
       res.status(200).json({
           message : "Order was posted",
           submitedOrder : order
       })
   })
   .catch(err =>{
       console.log(err);
       res.status(200).json({
           error : err
       })
   })
   
})

module.exports = route ;
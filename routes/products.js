const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Product = require('../model/product');


// GET Request

route.get('/' , (req , res ,next) => {
    Product.find()
    .select("name price _id") 
    .exec()
    .then(docs => {
        const response = {
            count : docs.length ,
            products : docs.map(doc => {
                return {
                    name : doc.name ,
                    price : doc.price ,
                    _id : doc._id ,
                    request : {
                        type : 'GET' ,
                        url : 'http://localhost:8000/products/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ error : err })
    })  
})


// Post Request

route.post('/' , (req , res , next) => {
   
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
         name : req.body.name ,
         price : req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message : 'Product has been added',
            createdProduct : {
                name : result.name ,
                price : result.price ,
                _id : result._id ,
                request : {
                    type : 'POST' ,
                    url : "http://localhost:8000/products/" + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        });
    });
    
})

route.get('/:productId' , (req , res , next) => {
    const id = req.params.productId;

    Product.findById(id)
    .then( doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json({doc})
        } else {
            res.status(404).json({
                message : "Sorry! Invalid Id"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

module.exports = route ;
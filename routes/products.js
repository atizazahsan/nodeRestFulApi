const express = require('express');
const route = express.Router();

route.get('/' , (req , res) => {
    res.send("Product List")
} )

module.exports = route ;
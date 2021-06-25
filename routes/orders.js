const express = require('express');
const route = express.Router();

// Show all Orders

route.get('/' , (req , res , next) => {
    res.send("All Orders Here")
})

module.exports = route ;
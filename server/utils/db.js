const express = require('express');

const mongoose = require('mongoose');

const connectDb= async() =>{
    await mongoose.connect('mongodb+srv://saranggp2018:IqxKenzJfiLRwlzh@cluster0.pafub.mongodb.net/')
    .then(() =>{
        console.log('Mongodb connected');
    })
    .catch((error) =>{
        console.log(error)
    })
}

module.exports = connectDb;
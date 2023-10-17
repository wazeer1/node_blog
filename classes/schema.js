const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catogary = new Schema({
    name:{
        type:String,
        required: true,
    },
    discription:{
        type:String,
        required: true
    },
});

const Category = mongoose.model('Category',catogary);

module.exports = Category
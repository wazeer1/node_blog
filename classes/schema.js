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

const classes = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    }
})
const Classes = mongoose.model('Classes',classes)
module.exports = Category
module.exports = Classes
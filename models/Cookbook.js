//Import connection
const { model } = require('../db/connection')
const mongoose = require('../db/connection')
//IMPORT THE SCHEMA CLASS. Classes are uppercase.
const Schema = mongoose.Schema

/* Create Cookbook as new schema
    Properties:
    title (string),
    yearPublished (integer),
*/

const cookSchema = new Schema ({
    title: {type: String},
    yearPublished: {type: Number}, 
})

//export model named "Cookbook"
const Cookbook = mongoose.model('Cookbooks', cookSchema)
module.exports = Cookbook
const mongoose=require('mongoose')

var userSchema=mongoose.Schema({
    username:String,
    password:[String],
    fname:String,
    lname:String,
    image:String
})

module.exports=mongoose.model('users',userSchema)
const mongoose=require('mongoose')
const database=process.env.DATABASE

exports.connect=function(){
    mongoose.connect(database).then(()=>{
        console.log('Database connect...');
    }).catch(err=>{
        console.log(err);
    })
}

const mango=require('mongoose');
const productSchema=mango.Schema({
    firstname:String,
    lastname:String,
    dob:String,
    emailid:String,
    gender:String,
    coutry:String,
    state:String,
    city:String,
    address:String,
    pincode:Number
});
module.exports=mango.model("meanprojects",productSchema);
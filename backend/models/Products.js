const mongoose=require('mongoose');
const {Schema}=mongoose;

const ProdSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    company:{
        type:String,
        require:true
    }
});

const Prod=mongoose.model('products',ProdSchema);
module.exports =Prod
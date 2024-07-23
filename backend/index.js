const express = require('express')
const connectToMongo=require('./db')
const User=require('./models/User')
const Prod=require('./models/Products')
const cors=require("cors");

connectToMongo;
const app = express()
const port = 5000

app.use(cors());
app.use(express.json())

//authentication

//1.insert

app.post('/register',async(req,res)=>{
  const user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;
    res.send(result);
})

//2.login

app.post('/login',async(req,res)=>{
  const user=await User.findOne(req.body).select('-password');
  res.send(user);
})

//Products

//add product

app.post('/addProduct',async(req,res)=>{
  const product=new Prod(req.body);
  let result=await product.save();
  res.send(result);
})

//list products

app.get('/listProducts',async(req,res)=>{
  const result=await Prod.find();
  if(result.length>0)
  {
    res.send(result);
  }
  else
  {
    res.send({result:"No Products Found...."});
  }
})

//delete products

app.delete('/delProduct/:id',async(req,res)=>{
  let result=await Prod.deleteOne({_id:req.params.id});
  res.send(result);

})

//update Product

app.get('/updprefill/:id',async(req,res)=>{
  let result=await Prod.findOne({ _id: req.params.id });
  if(result)
  {
    res.send(result);
  }
  else{
    res.send({result:"No record found"});
  }
})

app.put('/updProduct/:id', async (req, res) => {
  let result = await Prod.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

//search Product

app.get('/search/:key',async(req,res)=>{
  let result=await Prod.find({
    "$or":[
        {name:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
        {category:{$regex:req.params.key}}
    ]
  });
  res.send(result);
})

app.listen(port, () => {
  console.log(`eCommerce Backend is listening at port ${port}`)
})
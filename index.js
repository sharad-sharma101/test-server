const express = require("express")
const invoiceRouter = require("./routers/invoices");
const bodyParser = require('body-parser')
require("dotenv").config()
const mongoose=require('mongoose')
const app = express();

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

const Insta = require("instamojo-nodejs")
//app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))
const API_Key = "test_f7b3a36d1bbff9e3a853159c46a";
const Auth_Token = "test_c6885f7b96b5e4e3adc15df807f";
Insta.setKeys(API_Key, Auth_Token);
Insta.isSandboxMode(true);

app.use(express.json());
const mongoose_URL= "mongodb+srv://sharadsharma-101:1mA66JmK1Ub2o660@cluster0.80uxmh1.mongodb.net/?retryWrites=true&w=majority";

app.get('/', (req, res) => {
    res.sendStatus(200)
  })


app.use("/api/invoice",invoiceRouter )

app.post('/pay', (req,res)=>{
    //console.log(req.body.name);
   const data = new Insta.PaymentData();
   const Redirect_url = "https://instamojo-test-server.onrender.com/success"
   data.setRedirectUrl(Redirect_url);
   data.send_email = "True";
   data.purpose = "Test"
   data.amount = req.body.amount;
   data.name = req.body.name;
   data.gmail = req.body.gmail;

   Insta.createPayment(data, function(error , response){
    if(error){
        console.log(error);
    } else {
        response.send("Please check your email");
    }
   })
})

app.get("/success" , (req,res)=>{
    res.send("payment is success")
})


mongoose.connect(mongoose_URL, ()=>{
    try{
    console.log("connect to mongoose")
    } catch (err) {
        console.log(err);
    }
})

app.listen(4000 , ()=>{
    console.log("working fine");
})




/// 1mA66JmK1Ub2o660
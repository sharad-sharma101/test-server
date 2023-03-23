const express = require("express")
const invoiceRouter = require("./routers/invoices");
const mongoose=require('mongoose')
const app = express();
const url = require('url');
var cors = require('cors')
const User = require('./model/Invoice')
app.use(cors()) // Use this after the variable declaration

// Credential for payment instamojo
const Insta = require("instamojo-nodejs")
app.use(express.urlencoded({extended:false}))
const API_Key = "test_f7b3a36d1bbff9e3a853159c46a";
const Auth_Token = "test_c6885f7b96b5e4e3adc15df807f";
Insta.setKeys(API_Key, Auth_Token);


app.use(express.json());
const mongoose_URL= "mongodb+srv://sharadsharma-101:1mA66JmK1Ub2o660@cluster0.80uxmh1.mongodb.net/?retryWrites=true&w=majority";

// to check connection 
app.get('/', (req, res) => {
    res.sendStatus(200)
  })

app.use("/api/invoice",invoiceRouter )



// router for payment of invoice 
app.post('/pay', (req,res)=>{

    const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);
	data.purpose = "For test purpose";
	data.amount = req.body.amount;
	data.buyer_name =  req.body.name;
	data.email =  req.body.gmail;
	data.redirect_url = req.body.url
	data.phone =  "9999999999"
	data.send_email = false;
	data.webhook = "http://www.example.com/webhook"
	data.send_sms = false;

	Insta.createPayment(data, function(error, response) {
		if (error) {
			console.log(error);
		} else {

			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse( response );
			const redirectUrl = responseData.payment_request.longurl;
			console.log( redirectUrl);
			res.status( 200 ).json( redirectUrl );
		}
	});

})

// router for callback payment 
app.get('/callback', (req,res) =>{
   let url_parts = url.parse(req.url , true);
   const responseData = url_parts.query;

   // if payment id genrated payment is successfull 
   if( responseData.payment_id){
	let userID = responseData.user_id;
	User.findByIdAndUpdate( {_id: userID}, {status: true}, {new: true})
	 .then( (user) => res.json(user))
	 .catch( (err) => console.log(err))
    
	// redirect to dashboard after successfull payment
	return res.redirect('https://instamojo-invoice.onrender.com')
   }

})

// connection with mongoose 
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
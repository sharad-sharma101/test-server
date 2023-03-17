const ex = require("express");
const { route } = require("express/lib/application")
const Invoice = require("../model/Invoice")
const router = ex.Router();

//ceating routes


//get all the invoices
router.get("/all", async (req,res) => {
  try{
    const invoices = await Invoice.find();
    res.json(invoices); 
  } catch (err) {
    res.json(err);
  }
});


// get single invoice
router.get("/:invoiceID", async (req, res) => {
    const invoiceId = req.params.invoiceID ;
    try{
      const single = await Invoice.findById(invoiceId);
      res.json(single);
    } catch (err) {
        res.json(err);
    }
});

// create invoice
router.post("/create", async(req , res) => {
    const invoice =  await Invoice.create(req.body)
    res.json(invoice)
})


// delete invoice
router.delete("/:invoiceID",async (req,res)=>{
    try{
       await Invoice.remove({id: req.params.invoiceID})
       res.status(200).json({
        message: "done"
       })
    } catch (err) {
        res.json(err);
    }
})
 

//update invoice
router.put("/:invoiceID", async (req,res)=>{

    const invoiceId = req.params.invoiceID ;
    try{
        const invoice = await Invoice.updateOne(
            {
                "_id": invoiceId
            },
            req.body
        )
        res.json(invoice)
    } catch (err) {
        res.json(err);
    }
})


module.exports = router ;
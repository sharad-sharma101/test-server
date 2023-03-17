const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
    name:{
        type : String ,
        required: true
    },
    amount:{
        type: Number ,
        required: true, 
    },
    gmail:{
        type: String,
        default: "General"
    },
    status:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date ,
        default: Date.now
    },
  });
  module.exports = mongoose.model('Invoice', InvoiceSchema);
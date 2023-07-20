import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
 
  },
});


const product = mongoose.model("Product", productSchema);
export default product
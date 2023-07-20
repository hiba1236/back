
import Product from '../models/product.js'

import asyncHandler from "express-async-handler";


const getProducts = asyncHandler(async(req, res)=>{
      const findProducts = await Product.find();
      res.json(findProducts);
})




const addProduct = asyncHandler( async (req, res)=>{

const { name, quantity, price } = req.body;
  const newProduct = new Product({
    name,
    quantity,
    price,
  });
  await newProduct.save();
  res.json(newProduct);

 });
  
const deleteProduct= asyncHandler(async(req,res)=>{
  await Product.findByIdAndDelete(req.params.id)
    res.json('product')

})
 const updateProduct = asyncHandler(async(req,res)=>{
  const newProduct = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
   
}
  const product  = await Product.findByIdAndUpdate(req.params.id, newProduct)
  res.json("product")
 })
export { getProducts, addProduct, deleteProduct, updateProduct};


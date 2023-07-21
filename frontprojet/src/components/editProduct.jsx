import { useState} from "react";
import { useDispatch } from "react-redux";
import {editProduct} from '../store/productSlice'
import { TextField, Modal, Button, Box, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};
export default function EditProduct(props) {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    name:props.editedProduct.name,
    quantity: props.editedProduct.quantity,
    price: props.editedProduct.price,
  });
  const dispatch = useDispatch()
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false)};
  const handleCloseModal = () => {
    handleClose();
    setProductData({
      name:props.editedProduct.name,
      quantity: props.editedProduct.quantity,
      price: props.editedProduct.price
    })
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct({productId: props.editedProduct._id, product: productData}));
    handleClose();
  };
  return (
    <Box>
      <EditIcon onClick={handleOpen} />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style}>
            <Typography sx={{mb:'25px', fontWeight:'bold'}}>Edit product</Typography>
            <Box component="form" onSubmit={onSubmit}>
            <Box sx={{mb:'15px'}}>
            <TextField sx={{width:'100%'}} id="outlined-basic" name='name' value={productData.name}  onChange={(e) => setProductData({ ...productData, name: e.target.value })} label="Product" variant="outlined" />
          </Box>
          <Box sx={{mb:'15px'}}>
            <TextField sx={{width:'100%'}} id="outlined-basic" name='quantity' value={productData.quantity} onChange={(e) => setProductData({ ...productData, quantity: e.target.value })} label="Category" variant="outlined" />
          </Box>
          <Box sx={{mb:'15px'}}>
            <TextField sx={{width:'100%'}} id="outlined-basic" name='price' value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} label="Price" variant="outlined" />
          </Box>
          <Box sx={{ textAlign:'end' }} >
            <Button variant="outlined" sx={{mr:'15px', width:'85px'}} onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" type="submit" sx={{width:'85px'}}>Edit</Button>
          </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
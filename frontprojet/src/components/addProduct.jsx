import { useState} from "react";
import { useDispatch } from "react-redux";
import {addProduct} from '../store/productSlice'
import { Container, TextField,  Modal,  Button, Box, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
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
export default function AddProduct() {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    name : '',
    quantity:'',
    price:''
  });
  const dispatch = useDispatch()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onChange = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addProduct(productData))
    setOpen(false)
  }
  return (
    <Container sx={{mt:'120px'}}>
      <Button variant="contained" onClick={handleOpen} sx={{backgroundColor:'primary.light', color:'white'}} endIcon={<AddIcon />}>Add product</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style}>
            <Typography sx={{mb:'25px', fontWeight:'bold'}}>Add new item</Typography>
            <Box component="form" onSubmit={onSubmit} onChange={onChange}>
            <Box sx={{mb:'15px'}}>
            <TextField sx={{width:'100%'}} id="outlined-basic" name='name' required label="name" variant="outlined" />
          </Box>
          <Box sx={{mb:'15px'}}>
            <TextField sx={{width:'100%'}} id="outlined-basic" name='quantity' required label="quantity" variant="outlined" />
          </Box>
          <Box sx={{mb:'15px'}}>
            <TextField sx={{width:'100%'}} id="outlined-basic" name='price' required label="Price" variant="outlined" />
          </Box>
          <Box sx={{ textAlign:'end' }} >
            <Button variant="outlined" sx={{mr:'15px', width:'85px'}} onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit" color="success" sx={{width:'85px'}}>Save</Button>
          </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}


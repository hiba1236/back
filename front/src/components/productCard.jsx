import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteProduct } from '../store/productSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, IconButton, CardActions, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditProduct from './editProduct';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function ProductCard(props) {
  const [expanded, setExpanded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = () => {
    dispatch(deleteProduct(props.product._id));
  };
  return (
    <Box>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete {props.product.name}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ maxWidth: 345 }}>

        <CardContent>
          <Typography variant="h2" color="text.secondary">{props.product.name}</Typography>
          <Typography variant="h4" color="text.secondary">{props.product.quantity}</Typography>
          <Typography variant="h5" color="text.secondary">{props.product.price}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <EditProduct editedProduct={props.product} />
          </IconButton>
          <IconButton aria-label="share">
            <DeleteIcon onClick={() => setDeleteDialogOpen(true)} sx={{ color: 'red' }} />
          </IconButton>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
    </Box>
  );
}
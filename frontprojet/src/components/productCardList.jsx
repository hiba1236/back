import { Box, Container, Grid } from '@mui/material'
import { useEffect } from 'react'
import ProductCard from './productCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../store/productSlice';

import AddProduct from './addProduct.jsx'

export default function ProductCardList() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);
    return (
        <Container sx={{ mt: "50px", mb: '100px' }}>
            <h1>Products List</h1>
            <Box sx={{ textAlign: 'end', mb: '50px' }}>
                <AddProduct />
            </Box>
            <Grid container spacing={2}>
                {
                    products.map((product, id) => {
                        return (
                            <Grid key={id} xs={12} md={3} item>
                                <ProductCard product={product} />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Container>
    )
}

import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getProducts = async () => {
  try {
    const response = await axios.get(API_URL + "/products");
    return response.data;
  } catch (err) {
    return err.message;
  }
};
const getProductById = async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/product/${productId}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  };


  const addProduct = async (productData) => {
    try {
      const response = await axios.post(API_URL + "/product", productData);
      return response.data;
    } catch (err) {
      return err.message;
    }
  };

 
  const editProduct = async (productId, productData) => {
    try {
      const response = await axios.put(`${API_URL}/product/${productId}`, productData);
      return response.data;
    } catch (err) {
      return err.message;
    }
  };


  const deleteProduct= async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/product/${productId}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  };

  const productService = {
    getProducts,
    addProduct,
    getProductById,
    editProduct,
    deleteProduct,
  };
  
  export default productService;




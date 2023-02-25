import axios from 'axios';

const PRODUCT_BASE_URL="http://localhost:8080/api/products/";
class ProductService{
    getProducts(){
        return  axios.get(PRODUCT_BASE_URL);
    }

    getProductByID(id){
            return  axios.get(PRODUCT_BASE_URL+id);
    }

    addProduct(product){
        return axios.post(PRODUCT_BASE_URL, product);
    }

     deleteProduct(id){
            return axios.delete(PRODUCT_BASE_URL+id);
     }

      updateProduct(product, id){
             return axios.put(PRODUCT_BASE_URL+id,product);
      }
}
export default new ProductService();
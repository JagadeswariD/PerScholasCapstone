import axios from 'axios';
import authHeader from '../authservices/AuthHeader';

const PRODUCT_BASE_URL="http://localhost:8080/api/products/";
class ProductService{
    getProducts(){
        return  axios.get(PRODUCT_BASE_URL,{ headers: authHeader() });
    }

    getProductByID(id){
            return  axios.get(PRODUCT_BASE_URL+id,{ headers: authHeader() });
    }

    addProduct(product){
        return axios.post(PRODUCT_BASE_URL, product,{ headers: authHeader() });
    }

     deleteProduct(id){
            return axios.delete(PRODUCT_BASE_URL+id,{ headers: authHeader() });
     }

      updateProduct(product, id){
             return axios.put(PRODUCT_BASE_URL+id,product,{ headers: authHeader() });
      }
}
export default new ProductService();
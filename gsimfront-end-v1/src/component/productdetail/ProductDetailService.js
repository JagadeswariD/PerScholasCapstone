import axios from 'axios';
import authHeader from '../authservices/AuthHeader';

const PRODUCT_DETAIL_BASE_URL="http://localhost:8080/api/productdetails/";
class ProductDetailService{
    getProductDetails(){
        return  axios.get(PRODUCT_DETAIL_BASE_URL,{ headers: authHeader() });
    }

    getProductDetailByID(id){
            return  axios.get(PRODUCT_DETAIL_BASE_URL+id,{ headers: authHeader() });
    }

    addProductDetail(productDetail){
        return axios.post(PRODUCT_DETAIL_BASE_URL, productDetail,{ headers: authHeader() });
    }

     deleteProductDetail(id){
            return axios.delete(PRODUCT_DETAIL_BASE_URL+id,{ headers: authHeader() });
     }

      updateProductDetail(productDetail, id){
             return axios.put(PRODUCT_DETAIL_BASE_URL+id,productDetail,{ headers: authHeader() });
      }
}
export default new ProductDetailService();
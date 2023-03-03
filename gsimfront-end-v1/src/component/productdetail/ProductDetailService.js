import axios from 'axios';

const PRODUCT_DETAIL_BASE_URL="http://localhost:8080/api/productdetails/";
class ProductDetailService{
    getProductDetails(){
        return  axios.get(PRODUCT_DETAIL_BASE_URL);
    }

    getProductDetailByID(id){
            return  axios.get(PRODUCT_DETAIL_BASE_URL+id);
    }

    addProductDetail(productDetail){
        return axios.post(PRODUCT_DETAIL_BASE_URL, productDetail);
    }

     deleteProductDetail(id){
            return axios.delete(PRODUCT_DETAIL_BASE_URL+id);
     }

      updateProductDetail(productDetail, id){
             return axios.put(PRODUCT_DETAIL_BASE_URL+id,productDetail);
      }
}
export default new ProductDetailService();
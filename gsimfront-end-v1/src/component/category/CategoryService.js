import axios from 'axios';
import authHeader from '../authservices/AuthHeader';

const CATEGORY_BASE_URL="http://localhost:8080/api/categories/";
class CategoryService{
    getCategories(){
        return  axios.get(CATEGORY_BASE_URL,{ headers: authHeader() });
    }

    getCategoryByID(id){
            return  axios.get(CATEGORY_BASE_URL+id,{ headers: authHeader() });
    }

    addCategory(category){
        return axios.post(CATEGORY_BASE_URL, category,{ headers: authHeader() });
    }

     deleteCategory(id){
            return axios.delete(CATEGORY_BASE_URL+id,{ headers: authHeader() });
     }

      updateCategory(category, id){
             return axios.put(CATEGORY_BASE_URL+id,category,{ headers: authHeader() });
      }
}
export default new CategoryService();
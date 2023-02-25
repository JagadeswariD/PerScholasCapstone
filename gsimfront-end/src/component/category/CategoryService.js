import axios from 'axios';

const CATEGORY_BASE_URL="http://localhost:8080/api/categories/";
class CategoryService{
    getCategories(){
        return  axios.get(CATEGORY_BASE_URL);
    }

    getCategoryByID(id){
            return  axios.get(CATEGORY_BASE_URL+id);
    }

    addCategory(category){
        return axios.post(CATEGORY_BASE_URL, category);
    }

     deleteCategory(id){
            return axios.delete(CATEGORY_BASE_URL+id);
     }

      updateCategory(category, id){
             return axios.put(CATEGORY_BASE_URL+id,category);
      }
}
export default new CategoryService();
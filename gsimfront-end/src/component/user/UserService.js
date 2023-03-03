import axios from 'axios';

const USER_BASE_URL="http://localhost:8080/api/user";
class UserService{
    getVendors(){
        return  axios.get(USER_BASE_URL);
    }

    getUserByID(id){
            return  axios.get(USER_BASE_URL+id);
    }

    addUser(user){
        return axios.post(USER_BASE_URL, user);
    }

     deleteUser(id){
            return axios.delete(USER_BASE_URL+id);
     }

      updateUser(user, id){
             return axios.put(USER_BASE_URL+id,user);
      }
}
export default new VendorService();
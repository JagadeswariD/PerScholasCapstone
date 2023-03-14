import axios from "axios";
import authHeader from '../authservices/AuthHeader';

const API_URL = "http://localhost:8080/api/auth/";
const USER_BASE_URL="http://localhost:8080/api/users/";

class UserService {

  login(user) {
    return axios
      .post(API_URL + "signin", user)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("authenticated", true);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", user);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  getUsers(){
          return  axios.get(USER_BASE_URL,{ headers: authHeader() });
      }

  getUserByID(id){
          return  axios.get(USER_BASE_URL+id,{ headers: authHeader() });
  }

  addUser(user){
      return axios.post(USER_BASE_URL, user,{ headers: authHeader() });
  }

   deleteUser(id){
          return axios.delete(USER_BASE_URL+id,{ headers: authHeader() });
   }

    updateUser(user, id){
           return axios.put(USER_BASE_URL+id,user,{ headers: authHeader() });
    }
}

export default new UserService();
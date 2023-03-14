import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {


  login(user) {
    return axios
      .post(API_URL + "signin", user)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
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
    return JSON.parse(localStorage.getItem('user'));
  }

  checkExpirationTime(user)
  {
     const decodedJwt = JSON.parse(atob(user.accessToken.split('.')[1]));
     if (decodedJwt.exp * 1000 < Date.now()) {
        return false;
     }
        return true;
  }
}

export default new AuthService();
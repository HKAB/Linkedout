import { fetchWrapper } from "helpers";
import jwt from 'jsonwebtoken';
import { BehaviorSubject } from 'rxjs';
import { Config } from "../config/consts";

const userSubject = new BehaviorSubject(null);



function login(username, password) {
  return fetchWrapper.post(Config.backendUrl + `/api/account/login`, { username, password })
    .then(user => {
      userSubject.next(user);
      // start refresh token timer
      localStorage.setItem('user', JSON.stringify(user));
      console.log("login success");
      // console.log(sessionStorage.getItem('user').account);
      return user;
    })
}
function register(username, email, password, account_type) {
  return fetchWrapper.post(Config.backendUrl + `/api/account/register`, { username, password, email, account_type })
}
function changePassword(current_password, new_password) {
  return fetchWrapper.post(Config.backendUrl + `/api/account/changepassword`, { current_password, new_password })
}
function logout() {
  userSubject.next(null);
  localStorage.clear();
}
export const accountServices = {
  changePassword,
  login,
  logout,
  register,
  get userValue() {
    var user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      var decodedToken = jwt.decode(user.access_token, { complete: true });
      if (decodedToken) {
        var dateNow = new Date();
        // console.log(decodedToken.payload.exp*1000);
        // console.log(dateNow.getTime());
        if (decodedToken.payload.exp * 1000 > dateNow.getTime()) {
          return user
        }
      }
    }
    return userSubject.value
  }
}
import http from "./index";

export const register = (name, passWord) => {
  return http.post("/user/register", {
    name,
    passWord
  });
};

export const login = (name, passWord) => {
  return http.post("/user/login", {
    name,
    passWord
  });
};
import http from "./index";


/**
 * userId :string
 * content :string
 * completed :boolean
 */
export const add = option => {
  return http.post("/todo/add", option);
};

export const fetch = query => {
  return http.post('/todo/fetch',{query});
};
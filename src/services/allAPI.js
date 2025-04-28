import commonAPI from "./commonAPI";
import serverURL from "./serverURL";

export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/login`, reqBody);
};
export const addUserAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${serverURL}/adduser`, reqBody, reqHeader);
};
export const getUserAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getuser`, {}, reqHeader);
};
export const deleteUserAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/user/${id}/delete`, {});
};


export const addProductAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${serverURL}/addproduct`, reqBody, reqHeader);
};
export const getProductAPI = async (searchkey) => {
  return await commonAPI(
    "GET",
    `${serverURL}/getproduct?search=${searchkey}`,
    {}
  );
};
export const editProductAPI = async (reqBody, reqHeader, id) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/products/${id}/update`,
    reqBody,
    reqHeader
  );
};

export const removeProductAPI = async (id,reqHeader) => {
  return await commonAPI("DELETE", `${serverURL}/product/${id}/delete`, {},reqHeader);
};


export const addSaleAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${serverURL}/addsale`, reqBody, reqHeader);
};
export const getSalesAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getsales`, {}, reqHeader);
};
export const getSalesDataAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getsalesdata`, {}, reqHeader);
};
export const getTopProductsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/gettopproducts`, {}, reqHeader);
};
export const getMetricsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getmetrics`, {}, reqHeader);
};

export const getAuditLogsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getauditlogs`, {}, reqHeader);
};
import axios from 'axios';
import { message } from 'antd';

// parameters
const host = '';
const apiURL = `${host}/api`;

const Axios = axios.create({
  baseURL: apiURL,
  timeout: 60000,
  // withCredentials: true, // 是否允许带cookie
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
Axios.interceptors.request.use(config => config, err => Promise.reject(err));

// 响应拦截器
Axios.interceptors.response.use((res) => {
  const model = res.data;
  if (res.status === 200 || res.status === 304) {
    return Promise.resolve(model);
  }
  if (res.status === 401) {
    message.warning('用户未登陆');
  } else if (res.status === 500) {
    message.error('服务器无法理解');
  }
  return Promise.reject(res);
}, err => Promise.reject(err));


function formatParameters(parameter) {
  if (!parameter) {
    return '';
  }

  let parameterString = '?getWithParameters=true';
  Object.keys(parameter).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(parameter, key)) {
      parameterString += `&${key}=${parameter[key]}`;
    }
  });
  return parameterString;
}

const API = {
  get(url, data) {
    return Axios.get(`${url}${formatParameters(data)}`);
  },
  post(url, data) {
    return Axios.post(`${url}`, data);
  },
  put(url, data) {
    return Axios.put(`${url}`, data);
  },
};

export default API;

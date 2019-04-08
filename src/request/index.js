import axios from 'axios';

// axios 配置
axios.defaults.timeout = 30000; // 超时时间 30s
axios.defaults.baseURL = 'http://localhost:3000/'; // 基本URL

export default axios;
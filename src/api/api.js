import axios from 'axios';
import Qs from 'qs';

let base = '';

// 登录
export const requestLogin = params => { return axios.post(`${base}/zhac/account/login`, Qs.stringify(params)).then(res => res.data)}

// 通用图表数据（本地）
export const requestEchartsTest = params => { return axios.get(`../../static/json/echarts.json`,{}).then(res => res.data)}
// 通用图表数据（测试）
export const requestEcharts = params => { return axios.get(`/biview/getbiview`,{}).then(res => res.data)}

// 新增通用图表数据
export const requestCurrencyAddData = params => { return axios.get(`../../static/json/currencyAddData.json`,{}).then(res => res.data)}

// 专题图表数据
export const requestPowerBi = params => { return axios.get(`../../static/json/powerBi.json`,{}).then(res => res.data)}




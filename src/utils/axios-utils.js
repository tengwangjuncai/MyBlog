import axios from 'axios'

import {Notification,Message} from 'element-ui'


//创建axios实例

const  service =  axios.create({
    baseURL: '/wpyblogapi/api',
    headers:{'Content-Type':'application/json;charset=UTF-8'},
    timeout: 60000,
    withCredentials: true
});

//request 拦截器

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
return Promise.reject(error)
}
);

//response 拦截器

service.interceptors.response.use(
    response => {
        const  _data = response.data;
        console.error('获取回来数据了');
        console.error(_data);
       // 返回错误的自动拦截
        if(_data.code === 0){
                    return _data
                } else {
                    console.log('走这里了呀------')
            console.log(response)
                    return new Promise(() =>{
                        Notification.warning({message:`[${_data.errcode}] ${_data.result || _data.errmsg || '异常未描述'}`})
                    })
                }
    },

    error => {
        switch (error.response.status){
            case 400:
                error.message = '请求错误';
                break;
            case 401:
                error.message = '未授权，请登录';
            case 403:
                error.message = '拒绝访问';
                break;
            case 404:
                error.message = `请求地址出错: ${error.response.config.url}`;
                break;
            case 408:
                error.message = '请求超时';
                break;
            case 500:
                error.message = '服务器内部错误';
                break;
            case 501:
                error.message = '服务未实现';
                break;
            case 502:
                error.message = '网关错误';
                break;
            case 503:
                error.message = '服务不可用';
                break;
            case 504:
                error.message = '网关超时';
                break;
            case 505:
                error.message = 'HTTP版本不受支持';
                break;
            default:
                error.message = '未知错误';
                break;
        }
        if (error.response.data.message && error.response.data.message.length > 0){

            return new Promise(()=>{
                Message({message:error.response.data.message,center: true})
        })
        }else {
            return new Promise(() =>{
                Notification.error({message:error.message, duration: 5 * 1000})
            })
        }

    }
);

export default  service
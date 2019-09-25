import  http from  '@/utils/axios-utils/'


//请求头
export  function createHeaders() {
    let params = new  Object();
    params['Content-Type'] = 'application/json;charset=UTF-8';
    params['lang'] = 'CN';
    return {headers:params};
}


export  function httpGet(url, param) {

    return http.get(url,param);
}

export  function httpPost(url, param) {
    return http.post(url, param);
}



export  function getBrowser() {
    
    var explorer = navigator.userAgent.toLowerCase()
        var browser
    
    if (explorer.indexOf('chrome') > 0){
        browser = 'chrome'
    } else  if(explorer.indexOf('firefox') > 0){

        browser = 'firefox'
    }else if(explorer.indexOf('opera') > 0){
        browser = 'opera'
    }else if(explorer.indexOf('safari') > 0){
        browser = 'safari'
    }

    return browser;

}
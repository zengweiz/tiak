const API = (function () {

    const BASE_URL = 'https://study.duyiedu.com';
    const TOKEN_KEY = 'token';

    function get(path) {
    const headers ={};
    const token = localStorage.getItem(TOKEN_KEY);
    if(token){
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path,{ headers });
    }
    function post(path,bodyObj) {
    const headers ={
        'Content-type': 'application/json',
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if(token){
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path,{ 
        method: "POST",
        headers, 
        body: JSON.stringify(bodyObj),
    });
    }

    async function reg(userInfo) {//注册
        const resp = await post('/api/user/reg', userInfo);
        return await resp.json();
      }
    
    async function login(loginInfo) {//登录
        const resp = await post('/api/user/login', loginInfo);
        const result = await resp.json();
        if (result.code === 0) {
          // 登录成功
          // 将响应头中的token保存起来（localStorage）
          const token = resp.headers.get('authorization');
          localStorage.setItem(TOKEN_KEY, token);
        }
        return result;
      }
    
      async function exists(loginId) {//验证账号
        const resp = await get('/api/user/exists?loginId=' + loginId);
        return await resp.json();
      }
    
      async function profile() {//当前用户是否登录成功
        const resp = await get('/api/user/profile');
        return await resp.json();
      }
    
      async function sendChat(content) {//发送聊天信息
        const resp = await post('/api/chat', {
          content,
        });
        return await resp.json();
      }
    
      async function getHistory() {//获取聊天信息
        const resp = await get('/api/chat/history');
        return await resp.json();
      }
    
      function loginOut() {
        localStorage.removeItem(TOKEN_KEY);
      }
    
      return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut,
      };
})()



async function reg(userInfo) {//注册接口API
   const resp = await fetch("https://study.duyiedu.com/api/user/reg",{
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
    // const body = await resp.json();
    return await resp.json();
}

function login(loginInfo){//登录
    
}

function exists(loginId) {//验证

}

function profile(){//当前登录用户

}

function sendChat(content) {//发送聊天

}

function getHistory() {//获取聊天信息

}
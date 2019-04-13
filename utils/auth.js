const http = require('./http.js');

const login = (userinfo = {}) => {
  return new Promise((resolve, reject) => {
    // check if session expired
    // wx.checkSession({
    //   success: () => {
    //     resolve();
    //   },
    //   fail: () => {
        // login
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              http.post('auth', {
                code: res.code,
                nick_name: userinfo.nickName,
              }).then(r => {
                wx.setStorageSync('Authorization', r.data.token);
                resolve();
              }).catch(e => {
                reject(e);
              });
            }
          }
        });
    //   }
    // });
  });
};

module.exports = {
  login,
};

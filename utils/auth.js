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
              http.post('auth/login', {
                code: res.code,
                nick_name: userinfo.nickName,
                gender: userinfo.gender,
                avatar_url: userinfo.avatarUrl,
              }).then(r => {
                wx.setStorageSync('Authorization', r.data.token);
                wx.setStorageSync('uid', r.data.uid);
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

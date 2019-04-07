const http = require('./utils/http.js');

//app.js
App({

  lodash: {
    groupBy: require('./utils/lodash.groupby/index.js'),
    orderBy: require('./utils/lodash.orderby/index.js'),
    find: require('./utils/lodash.find/index.js'),
    filter: require('./utils/lodash.filter/index.js'),
    forEach: require('./utils/lodash.foreach/index.js'),
    values: require('./utils/lodash.values/index.js'),
    keys: require('./utils/lodash.keys/index.js'),
    map: require('./utils/lodash.map/index.js')
  },
  
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // check if session expired
              wx.checkSession({
                fail: () => {
                  // login
                  wx.login({
                    success: res => {
                      // 发送 res.code 到后台换取 openId, sessionKey, unionId
                      if (res.code) {
                        http.post('auth', {
                          code: res.code,
                          nick_name: this.globalData.userInfo.nickName
                        }).then(r => {
                          console.log(r.data);
                          wx.setStorageSync('Authorization', r.data);
                        }).catch(e => {
                          console.log(e);
                        });
                      }
                    }
                  });
                }
              });

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          });
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
// index.js
// 获取应用实例
const app = getApp();
const auth = require('../../../utils/auth.js');

Page({
  data: {
    motto: 'Welcome to beacon~~~',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
      auth.login(app.globalData.userInfo).then(() => {
        wx.switchTab({
          url: '/src/pages/home/index',
        });
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
        auth.login(res.userInfo).then(() => {
          wx.switchTab({
            url: '/src/pages/home/index',
          });
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
          auth.login(res.userInfo).then(() => {
            wx.switchTab({
              url: '/src/pages/home/index',
            });
          });
        },
      });
    }
  },
  getUserInfo(e) {
    console.log(e);
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      });
      auth.login(app.globalData.userInfo).then(() => {
        wx.switchTab({
          url: '/src/pages/home/index',
        });
      });
    }
  },
});

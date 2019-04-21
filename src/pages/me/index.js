const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad() {
    wx.setBackgroundColor({
      backgroundColorTop: '#ffffff', // 窗口的背景色为白色
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
      console.log(this.data.userInfo);
    }
  },
});

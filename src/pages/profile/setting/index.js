const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
      console.log(this.data.userInfo);
    }
  },
});

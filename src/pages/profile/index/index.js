const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  handleTap(e) {
    console.log(e);
    switch (e.target.dataset.name) {
      case 'friend':
        wx.navigateTo({
          url: '/src/pages/friend/index',
        });
        break;
      default:
        break;
    }
  },
  handleTap2(e) {
    switch (e.target.dataset.name) {
      case 'achievement':
        wx.navigateTo({
          url: '/src/pages/profile/achievement/index',
        });
        break;
      default:
        break;
    }
  },
  handleTap3(e) {
    console.log(e);
    switch (e.target.dataset.name) {
      case 'setting':
        wx.navigateTo({
          url: '/src/pages/profile/setting/index',
        });
        break;
      default:
        break;
    }
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

Page({
  // methods
  goAdd: function () {
    if (!getApp().data.hasAuthorize) {
      wx.switchTab({
        url: '../../profile/index/index',
      })
    } else {
      wx.navigateTo({
        url: '../../../components/add/addHabbit'
      })
    }
  },
});

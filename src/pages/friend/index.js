const app = getApp();

Page({
  data: {
    friends: [
      {
        uid: 1,
        nickName: 'RSdot',
        gender: 1,
        avatarUrl: '',
      },
      {
        uid: 2,
        nickName: 'Lagranmoon',
        gender: 0,
        avatarUrl: '',
      },
    ],
  },
  onShareAppMessage() {
    let uid = null;
    if (app.globalData) {
      uid = app.globalData.uid || null;
    }
    return {
      title: '邀请你一起互相监督，努力向前～',
      path: `/src/pages/authorize/index?uid=${uid}`,
      imageUrl: '',
    };
  }
});

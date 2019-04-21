const app = getApp();
// const http = require('../../../utils/http.js');

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
  getData() {
    // TODO: wait for backend
    // http.get('user/friend').then((res) => {
    //   console.log(res.data);
    //   const friends = res.data.map((obj) => {
    //     return {
    //       uid: obj.uid || null,
    //       nickName: obj.nick_name || '',
    //       gender: obj.gender || 2,
    //       avatarUrl: obj.avatar_url || '',
    //     };
    //   });
    //   this.setData({ friends });
    // });
  },
  onLoad() {
    this.getData();
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
  },
});

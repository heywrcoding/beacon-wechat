// TODO: wait for backend api
// const http = require('../../../utils/http.js');

Page({
  data: {
    activities: [
      {
        id: 0,
        user: 'RSzyh',
        operation: '创建了',
        target: '吃早饭',
        targetType: '习惯',
        content: '每天都要吃早饭哟~',
        date: '2019/3/15',
        avatar: '/images/test_avatar/avatar_1.png',
      },
      {
        id: 1,
        user: 'Lagranmoon',
        operation: '创建了',
        target: '抽象代数100分',
        targetType: '目标',
        content: '抽象代数期末考试要考100分！~',
        date: '2019/4/17',
        avatar: '/images/test_avatar/avatar_3.png',
      },
      {
        id: 2,
        user: 'Sherman',
        operation: '完成了',
        target: '做首页',
        targetType: '目标',
        content: '完成了目标！明天也要继续努力！',
        date: '2019/4/12',
        avatar: '/images/test_avatar/avatar_2.png',

      },
      {
        id: 3,
        user: 'Sherman',
        operation: '创建了',
        target: '做首页',
        targetType: '目标',
        content: '3天之内把首页代码写完！',
        date: '2019/4/9',
        avatar: '/images/test_avatar/avatar_2.png',
      },
      {
        id: 4,
        user: 'Tinker',
        operation: '打卡了',
        target: '跑步',
        targetType: '习惯',
        content: '完成打卡，好累呀~',
        date: '2019/4/6',
        avatar: '/images/test_avatar/avatar_4.png',
      },
      {
        id: 5,
        user: 'Tinker',
        operation: '创建了',
        target: '跑步',
        targetType: '习惯',
        content: '每天绕操场跑3圈，1200米',
        date: '2019/4/5',
        avatar: '/images/test_avatar/avatar_4.png',
      },
    ],
  },

  onShow() {
    // TODO: wait for backend api
    // http.get('activity').then((res) => {
    //   console.log(res.data);
    //   this.setData({ activities: res.data.activities });
    // });

    // this.timeline = this.selectComponent('#timeline');
    // console.log(this.timeline);
    // this.timeline.getActivities(this.data);
  },
});

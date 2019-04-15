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
        content: 'fafafafaaaaaaaaaaaaaaaaaasdsadassadadaadeeefuck',
        date: '2019年4月15日9时35分',
        avatar: '/images/avatar_girl.png',
      },
      {
        id: 1,
        user: 'RSzyh',
        operation: '完成了',
        target: '做首页',
        targetType: '目标',
        content: 'vzxvzvfafa',
        date: '2019年4月15日9时40分',
        avatar: '/images/avatar_boy.png',
      },
      {
        id: 2,
        user: 'RSzyh',
        operation: '创建了',
        target: '做首页',
        targetType: '目标',
        content: 'davokpjoia',
        date: '2019年4月15日9时45分',
      },
      {
        id: 3,
        user: 'RSzyh',
        operation: '创建了',
        target: '做首页',
        targetType: '目标',
        content: 'davokpjoia',
        date: '2019年4月15日9时45分',
      },
      {
        id: 4,
        user: 'RSzyh',
        operation: '创建了',
        target: '做首页',
        targetType: '目标',
        content: 'davokpjoia',
        date: '2019年4月15日9时45分',
      },
      {
        id: 5,
        user: 'RSzyh',
        operation: '创建了',
        target: '做首页',
        targetType: '目标',
        content: 'davokpjoia',
        date: '2019年4月15日9时45分',
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

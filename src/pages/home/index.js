const http = require('../../../utils/http.js');

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
      },
      {
        id: 1,
        user: 'RSzyh',
        operation: '完成了',
        target: '做首页',
        targetType: '目标',
        content: 'vzxvzvfafa',
      },
      {
        id: 2,
        user: 'RSzyh',
        operation: '创建了',
        target: '做首页',
        targetType: '目标',
        content: 'davokpjoia',
      },
    ],
  },

  onShow() {
    http.get('activity').then((res) => {
      console.log(res.data);
      this.setData({ activities: res.data.activities });
    });

    // this.timeline = this.selectComponent('#timeline');
    // console.log(this.timeline);
    // this.timeline.getActivities(this.data);
  },
  onReady() {
  },
});

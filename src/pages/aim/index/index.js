// const http = require('../../../../utils/http.js');

Page({
  data: {
    aim: [],
  },

  getData() {
    // TODO: wait for backend api
    // http.get('aim').then((res) => {
    //   console.log(res.data);
    //   this.setData({ aim: res.data });
    // });
    const aim = [
      {
        id: 1,
        title: '成为海贼王',
        done: false,
        open: true,
        children: [
          {
            id: 2,
            title: '找一艘船',
            done: false,
            open: true,
          },
          {
            id: 3,
            title: '找一群伙伴',
            done: true,
            open: true,
          },
        ],
      },
      {
        id: 4,
        title: '看blackpink演唱会',
        done: false,
        open: true,
        children: [
          {
            id: 5,
            title: '买一台望远镜手机',
            done: false,
            open: true,
          },
          {
            id: 6,
            title: '买飞机票',
            done: false,
            open: false,
          },
          {
            id: 7,
            title: 'blackpink in your area',
            done: false,
            open: true,
          },
        ],
      },
      {
        id: 8,
        title: '测试一下标题过长的目标处理',
        done: false,
        open: true,
        children: [],
      },
    ];
    this.setData({ aim });
  },

  onShow() {
    this.getData();
  },
});

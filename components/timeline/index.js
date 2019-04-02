Component({
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

  /**
   * methods
   */
  methods: {
    goDetails: function (event) {
      console.log(event);
      var id = event.currentTarget.id
      console.log(id)
      wx.navigateTo({
        url: '../view/viewDetails/viewDetails?id=' + id,
      })
      console.log("go to details");
    },
  },




});

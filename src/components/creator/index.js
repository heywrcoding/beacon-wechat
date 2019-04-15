Component({
  data: {
    isShow: false,
    style: {
      mainIcon: 'main-icon',
      habit: 'item-ball hide',
      content: 'item-ball hide',
    },
  },
  methods: {
    switchDisplay() {
      this.setData({
        isShow: !this.data.isShow,
      });
      const { style } = this.data;
      if (this.data.isShow) {
        style.mainIcon = 'main-icon rotate-45';
        style.habit = 'item-ball row-1 show';
        style.content = 'item-ball row-2 show';
      } else {
        style.mainIcon = 'main-icon';
        style.habit = 'item-ball row-2 hide';
        style.content = 'item-ball row-1 hide';
      }
      console.log(style);
      this.setData({ style });
    },
    createHabit() {
      // TODO: nagivate to create habit page
      console.log('new habit');
      wx.navigateTo({
        url: '/src/pages/habit/detail/index?id=__new__',
      });
    },
    createAim() {
      // TODO: nagivate to create aim page
      console.log('new aim');
    },
  },
  // show() will run when the page show every times.
  pageLifetimes: {
    show() {
      this.setData({ isShow: false });
    },
  },
});

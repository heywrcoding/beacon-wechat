Page({
  data: {
    indicatorDots: true,
    indicatorColor: 'grey',
    indicatorActiveColor: 'lightblue',
    current: 0,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    habit: {
      user: 'Leegroup Tan',
      initiator: 'Leegroup Tan',
      name: '吃早餐',
      taxology: '生活',
      images: '../../../../images/testForViewDetails.jpg,../../../../images/testForViewDetails2.jpg',
      image: '../../../../images/testForViewDetails.jpg',
      content: '今天的早餐吃得也很开心呢~',
      date: '2019年4月3日9时35分',
      recentClockIn: '2019年4月5日16时5分',
      location: '电子科技大学，成都，四川',
      frequency: 0,
      today: false,
      duration: 35,
    },
    // more: {
    //   black: '../Images/more-black.png',
    //   white: '../Images/more-white.png'
    // },
    change: false,
    modeAnimation: '',
    user: {},
  },
  // methods
  imageOnLoad(ev) {
    console.log(`图片加载成功，width: ${ev.detail.width}; height: ${ev.detail.height}`);
  },
  imageOnLoadError() {
    console.log('图片加载失败');
  },
  swiperChange(event) {
    const { current } = event.detail;
    this.setData({
      current,
    });
  },
  like() {
    if (this.data.habit.is_liked) return;
    const { uid, timestamp, token } = getApp().data.key;
    const habitId = this.data.habit.id;
    wx.request({
      url: `${getApp().data.domain}habits/like`,
      method: 'POST',
      data: {
        uid, timestamp, token, habitId,
      },
      success(res) {
        if (res.data.code === 0) {
          const { habit } = this.data;
          habit.is_liked = 1;
          this.setData({
            habit,
          });
          console.log(this.data.habit);
        } else {
          console.log(res);
        }
      },
      fail(err) {
        console.log(err);
      },
    });
  },

  edit() {
    const { habit } = this.data;
    if (typeof (habit.images) === 'string') {
      habit.images = habit.images ? habit.images.split(',') : [];
    }
    getApp().data.savedhabit = habit;
    wx.redirectTo({
      url: '../addhabit/addhabit',
    });
  },

  del() {
    console.log('del');
    // let { uid, timestamp,  token} = getApp().data.key
    const habitId = this.data.habit.id;
    wx.showModal({
      title: '删除',
      content: '是否删除该习惯？',
      success(res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: `${getApp().data.domain}habits/delete`,
            method: 'GET',
            data: {
              uid, timestamp, token, habitId,
            },
            complete() {
              wx.navigateBack();
            },
          });
        }
      },
    });
  },

  change() {
    this.setData({
      change: !this.data.change,
    });
  },

  changeMode(event) {
    const { mode } = event.currentTarget.dataset;
    const { habit } = this.data;
    habit.mode = mode;
    console.log(habit.mode);
    this.setData({
      habit,
      change: false,
    });
    this.updatehabit();
  },

  updatehabit() {
    let { images } = this.data;
    if (typeof (images) === 'object') {
      images = images.join();
    }
    const data = {
      habitId: this.data.habit.id,
      date: this.data.habit.date,
      title: this.data.habit.title,
      content: this.data.habit.content,
      images,
      mode: parseInt(this.data.habit.mode),
    };
    getApp().edithabit(data);
  },

  onLoad(option) {
    console.log(option);
    // let find = getApp().lodash.find
    // let habit = find(getApp().data.habits, (val) => {
    //   return val.id === Number(options.id)
    // })
    // this.setData({
    //   habit: habit,
    //   user: getApp().data.user
    // })
    // console.log(habit)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.setNavigationBarTitle({
      title: '习惯详情',
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    wx.setNavigationBarTitle({
      title: '修改习惯',
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return getApp().data.shareMenu;
  },
});

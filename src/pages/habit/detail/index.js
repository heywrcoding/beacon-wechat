const http = require('../../../../utils/http.js');

Page({
  data: {
    // indicatorDots: true,
    // indicatorColor: 'grey',
    // indicatorActiveColor: 'lightblue',
    // current: 0,
    // interval: 2000,
    // duration: 500,
    // previousMargin: 0,
    // nextMargin: 0,
    isCreateMode: false,
    isEditMode: false,
    habit: {},
    mdInput: {
      title: {
        input: 'md-input',
        placeholder: 'md-placeholder label-light',
      },
      content: {
        input: 'md-input',
        placeholder: 'md-placeholder label-light',
      },
    },
  },

  // methods
  getData() {
    console.log(this.data);
    http.get(`habit/${this.data.habit.id}`).then((res) => {
      console.log(res.data);
      this.setData({
        habit: {
          ...this.data.habit,
          ...res.data,
        },
      });
      const mdInput = { ...this.mdInput };
      if (res.data.title && res.data.title !== '') {
        mdInput.title = {
          input: 'md-input',
          placeholder: 'md-placeholder-float label-light',
        };
      }
      if (res.data.content && res.data.content !== '') {
        mdInput.content = {
          input: 'md-input',
          placeholder: 'md-placeholder-float label-light',
        };
      }
      this.setData({ mdInput });
      mdInput.title.placeholder += ' md-placeholder';
      mdInput.content.placeholder += ' md-placeholder';
      this.setData({ mdInput });
    });
  },
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
  // like() {
  //   if (this.data.habit.is_liked) return;
  //   const { uid, timestamp, token } = getApp().data.key;
  //   const habitId = this.data.habit.id;
  //   wx.request({
  //     url: `${getApp().data.domain}habits/like`,
  //     method: 'POST',
  //     data: {
  //       uid, timestamp, token, habitId,
  //     },
  //     success(res) {
  //       if (res.data.code === 0) {
  //         const { habit } = this.data;
  //         habit.is_liked = 1;
  //         this.setData({
  //           habit,
  //         });
  //         console.log(this.data.habit);
  //       } else {
  //         console.log(res);
  //       }
  //     },
  //     fail(err) {
  //       console.log(err);
  //     },
  //   });
  // },

  submit(e) {
    console.log(e);
    this.setData({
      habit: {
        ...this.data.habit,
        title: e.detail.value.title,
        content: e.detail.value.content,
        frequency: +e.detail.value.frequency,
        duration: +e.detail.value.duration,
      },
    });
    if (this.data.isCreateMode) {
      http.post('habit', this.data.habit).then((res) => {
        console.log(res);
        // TODO: wait for backend id to redirect
        wx.navigateBack({
          delta: 1,
        });
      });
    } else {
      // TODO: wait for backend modify habit
      this.setData({ isCreateMode: false });
    }
  },

  edit() {
    // TODO: change into edit mode
    this.setData({ isEditMode: true });
  },

  cancel() {
    if (this.data.isCreateMode) {
      wx.navigateBack({
        delta: 1,
      });
    } else {
      this.setData({ isEditMode: false });
    }
  },

  deleteHabit() {
    if (this.data.habit.id) {
      http.delete(`habit/${this.data.habit.id}`).then(() => {
        wx.switchTab({
          url: '/src/pages/habit/index/index',
        });
      });
    }
  },

  handleInputFocus(e) {
    const mdInput = { ...this.data.mdInput };
    mdInput[e.target.dataset.name] = {
      input: 'md-input',
      placeholder: 'md-placeholder md-placeholder-float',
    };
    this.setData({ mdInput });
  },

  handleInputBlur(e) {
    const mdInput = { ...this.data.mdInput };
    if (e.detail.value === '') {
      mdInput[e.target.dataset.name] = {
        input: 'md-input',
        placeholder: 'md-placeholder label-light',
      };
    } else {
      mdInput[e.target.dataset.name].placeholder += ' label-light';
    }
    this.setData({ mdInput });
  },

  onLoad(option) {
    console.log('-----', option);
    let title = '习惯详情';
    if (option.id !== '__new__') {
      this.setData({
        habit: { id: option.id },
      });
      this.getData();
    } else {
      console.log('new');
      this.setData({
        isCreateMode: true,
        isEditMode: true,
      });
      title = '编辑习惯';
    }
    wx.setNavigationBarTitle({ title });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return getApp().data.shareMenu;
  },
});

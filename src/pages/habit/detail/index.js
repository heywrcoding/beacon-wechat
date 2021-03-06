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
    habit: {
      id: null,
      title: '',
      content: '',
      frequency: 1,
      isOpen: true,
      creatTime: '',
    },
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
    picker: {
      frequency: {
        range: [...Array(31).keys()].slice(1),
        index: 0,
      },
    },
  },

  // methods
  getData() {
    // get habit data
    http.get(`habit/${this.data.habit.id}`).then((res) => {
      console.log(res.data);
      const { habit } = this.data;
      habit.isOpen = res.data.is_open;
      habit.content = res.data.content || '';
      habit.frequency = res.data.frequency || 1;
      habit.createTime = res.data.create_time || '';

      // init md-input css style
      const { mdInput } = this.data;
      if (habit.title && habit.title !== '') {
        mdInput.title = {
          input: 'md-input',
          placeholder: 'md-placeholder-float label-light',
        };
      }
      if (habit.content && habit.content !== '') {
        mdInput.content = {
          input: 'md-input',
          placeholder: 'md-placeholder-float label-light',
        };
      }
      // init frequency data
      const { picker } = this.data;
      let index = this.data.picker.frequency.range.indexOf(this.data.habit.frequency);
      index = index === -1 ? 0 : index;
      picker.frequency.index = index;
      // update data
      this.setData({
        habit,
        mdInput,
        picker,
      });
      // avoid md-input animation delay
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

  submit() {
    const params = {
      title: this.data.habit.title,
      content: this.data.habit.content,
      frequency: this.data.habit.frequency,
      is_open: this.data.habit.isOpen,
    };
    console.log(params);
    if (this.data.isCreateMode) {
      // create a habit
      http.post('habit', params).then((res) => {
        wx.redirectTo({
          url: `/src/pages/habit/detail/index?id=${res.data.id}`,
        });
      });
    } else if (this.data.habit.id) {
      // modify a habit
      http.put(`habit/${this.data.habit.id}`, params).then((res) => {
        console.log(res);
        this.setData({ isEditMode: false });
      });
    }
  },

  edit() {
    this.setData({ isEditMode: true });
    const { mdInput } = this.data;
    Object.keys(mdInput).forEach((key) => {
      if (mdInput[key].input) {
        mdInput[key].input += ' md-input-editable';
      }
    });
    this.setData({ mdInput });
  },

  cancel() {
    if (this.data.isCreateMode) {
      wx.navigateBack({
        delta: 1,
      });
    } else {
      this.setData({ isEditMode: false });
      const { mdInput } = this.data;
      Object.keys(mdInput).forEach((key) => {
        if (mdInput[key].input) {
          mdInput[key].input = 'md-input';
        }
      });
      this.setData({ mdInput });
      this.getData();
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
      input: 'md-input md-input-editable md-input-focus',
      placeholder: 'md-placeholder md-placeholder-float',
    };
    this.setData({ mdInput });
  },

  handleInput(e) {
    // modify input value
    const { habit } = this.data;
    habit[e.target.dataset.name] = e.detail.value;
    // update data
    this.setData({ habit });
  },

  handleInputBlur(e) {
    // modify input value
    const { habit } = this.data;
    habit[e.target.dataset.name] = e.detail.value;
    // md-input animation
    const mdInput = { ...this.data.mdInput };
    if (e.detail.value === '') {
      mdInput[e.target.dataset.name] = {
        input: 'md-input md-input-editable',
        placeholder: 'md-placeholder label-light',
      };
    } else {
      mdInput[e.target.dataset.name] = {
        input: 'md-input md-input-editable',
        placeholder: 'md-placeholder md-placeholder-float label-light',
      };
    }
    // update data
    this.setData({
      mdInput,
      habit,
    });
  },

  handlePickerChange(e) {
    const { picker } = this.data;
    const { habit } = this.data;
    picker[e.target.dataset.name].index = +e.detail.value;
    habit[e.target.dataset.name] = picker[e.target.dataset.name].range[+e.detail.value];
    this.setData({
      habit,
      picker,
    });
  },

  handleSwitchChange(e) {
    const { habit } = this.data;
    habit[e.target.dataset.name] = e.detail.value;
    this.setData({ habit });
  },

  onLoad(option) {
    console.log('-----', option);
    let title = '习惯详情';
    const { habit, mdInput } = this.data;
    if (option.id !== '__new__') {
      habit.id = +option.id;
      habit.title = option.title;
      this.setData({ habit });
      this.getData();
    } else {
      // create mode
      mdInput.title.input += ' md-input-editable';
      mdInput.content.input += ' md-input-editable';
      this.setData({
        isCreateMode: true,
        isEditMode: true,
        mdInput,
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

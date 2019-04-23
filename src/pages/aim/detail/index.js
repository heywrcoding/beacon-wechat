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
    aim: {
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
    // get aim data
    http.get(`aim/${this.data.aim.id}`).then((res) => {
      console.log(res.data);
      const { aim } = this.data;
      aim.isOpen = res.data.is_open;
      aim.content = res.data.content || '';
      aim.frequency = res.data.frequency || 1;
      aim.createTime = res.data.create_time || '';

      // init md-input css style
      const { mdInput } = this.data;
      if (aim.title && aim.title !== '') {
        mdInput.title = {
          input: 'md-input',
          placeholder: 'md-placeholder-float label-light',
        };
      }
      if (aim.content && aim.content !== '') {
        mdInput.content = {
          input: 'md-input',
          placeholder: 'md-placeholder-float label-light',
        };
      }
      // init frequency data
      const { picker } = this.data;
      let index = this.data.picker.frequency.range.indexOf(this.data.aim.frequency);
      index = index === -1 ? 0 : index;
      picker.frequency.index = index;
      // update data
      this.setData({
        aim,
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
  //   if (this.data.aim.is_liked) return;
  //   const { uid, timestamp, token } = getApp().data.key;
  //   const aimId = this.data.aim.id;
  //   wx.request({
  //     url: `${getApp().data.domain}aims/like`,
  //     method: 'POST',
  //     data: {
  //       uid, timestamp, token, aimId,
  //     },
  //     success(res) {
  //       if (res.data.code === 0) {
  //         const { aim } = this.data;
  //         aim.is_liked = 1;
  //         this.setData({
  //           aim,
  //         });
  //         console.log(this.data.aim);
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
      title: this.data.aim.title,
      content: this.data.aim.content,
      frequency: this.data.aim.frequency,
      is_open: this.data.aim.isOpen,
    };
    console.log(params);
    if (this.data.isCreateMode) {
      // create a aim
      http.post('aim', params).then((res) => {
        wx.redirectTo({
          url: `/src/pages/aim/detail/index?id=${res.data.id}`,
        });
      });
    } else if (this.data.aim.id) {
      // modify a aim
      http.put(`aim/${this.data.aim.id}`, params).then((res) => {
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
    if (this.data.aim.id) {
      http.delete(`aim/${this.data.aim.id}`).then(() => {
        wx.switchTab({
          url: '/src/pages/aim/index/index',
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
    const { aim } = this.data;
    aim[e.target.dataset.name] = e.detail.value;
    // update data
    this.setData({ aim });
  },

  handleInputBlur(e) {
    // modify input value
    const { aim } = this.data;
    aim[e.target.dataset.name] = e.detail.value;
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
      aim,
    });
  },

  handlePickerChange(e) {
    const { picker } = this.data;
    const { aim } = this.data;
    picker[e.target.dataset.name].index = +e.detail.value;
    aim[e.target.dataset.name] = picker[e.target.dataset.name].range[+e.detail.value];
    this.setData({
      aim,
      picker,
    });
  },

  handleSwitchChange(e) {
    const { aim } = this.data;
    aim[e.target.dataset.name] = e.detail.value;
    this.setData({ aim });
  },

  onLoad(option) {
    console.log('-----', option);
    let title = '目标详情';
    const { aim, mdInput } = this.data;
    if (option.id !== '__new__') {
      aim.id = +option.id;
      aim.title = option.title;
      this.setData({ aim });
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
      title = '编辑目标';
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

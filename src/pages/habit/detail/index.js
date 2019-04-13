const http = require('../../../../utils/http.js');
const MDInput = require('../../../../utils/materialUI/mdinput/mdinput.js');

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
    inputs: [
      {
        mdInput: {
          mdi_num_range: '20',
          mdi_float_label: '标题',
          style_mdi_border_focus: 'border-bottom:1px solid blue;',
          style_mdi_float_up: 'color:blue;',
          hideFooter: 'true',
          onMDInput: 'onColumn0MDInput',
          onMDIBlur: 'onColumn0MDIBlur',
        },
      },
      {
        mdInput: {
          mdi_num_input: 0,
          mdi_num_range: '500',
          mdi_float_label: '描述',
          style_mdi_border_focus: 'border-bottom:1px solid blue;',
          style_mdi_float_up: 'color:blue;',
          onMDInput: 'onColumn1MDInput',
          onMDIBlur: 'onColumn1MDIBlur',
        },
      },
      {
        mdInput: {
          mdi_float_label: '重复频率',
          mdi_helper_text_error: 'always show tips',
          mdi_helper_text_tip: 'always show tips',
          mdi_num_input: 0,
          mdi_num_range: '12',
          style_mdi_border_focus: 'border-bottom:1px solid plum;',
          style_mdi_float_up: 'color:plum;',
          style_mdi_number_inputting: 'color:plum;',
          style_mdi_number_overflow: 'color:red;',
          style_mdi_helper_shown: 'color:grey;',
          style_mdi_helper_error: 'color:grey;',
          style_mdi_number_range: 'color:plum;',
          isHelperShowBefore: true,
          onMDInput: 'onColumn2MDInput',
          onMDIBlur: 'onColumn2MDIBlur',
        },
      },
    ],
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
      console.log(this.data);
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
      MDInput.putData(this.data.inputs);
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

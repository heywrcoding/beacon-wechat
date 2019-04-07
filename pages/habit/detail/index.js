Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    indicatorColor: 'grey',
    indicatorActiveColor: 'lightblue',
    current: 0,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    habbit: {
      user: 'Leegroup Tan',
      initiator: 'Leegroup Tan',
      name: '吃早餐',
      taxology: '生活',
      images: '/images/testForViewDetails.jpg,/images/testForViewDetails2.jpg',
      image: '../../../images/testForViewDetails.jpg',
      content: '今天的早餐吃得也很开心呢~',
      date: '2019年4月3日9时35分',
      recentClockIn: '2019年4月5日16时5分',
      location: '电子科技大学，成都，四川',
      frequency: 0,
      today: false,
      duration: 35
    },
    // more: {
    //   black: '../Images/more-black.png',
    //   white: '../Images/more-white.png'
    // },
    change: false,
    modeAnimation: '',
    user: {}
  },

  /**
   * function
   */
  imageOnLoad(ev) {
    console.log(`图片加载成功，width: ${ev.detail.width}; height: ${ev.detail.height}`)
  },
  imageOnLoadError() {
    console.log('图片加载失败')
  },
  swiperChange (event) {
    var current = event.detail.current
    this.setData({
      current: current
    })
  },
  like () {
    if (this.data.habbit.is_liked) return
    let _this = this
    let { uid, timestamp, token } = getApp().data.key
    let habbit_id = this.data.habbit.id
    wx.request({
      url: getApp().data.domain + 'habbits/like',
      method: 'POST',
      data: { uid, timestamp, token, habbit_id },
      success: function (res) {
        if (res.data.code === 0) {
          let habbit = _this.data.habbit
          habbit.is_liked = 1
          _this.setData({
            habbit: habbit
          })
          console.log(_this.data.habbit)
        } else {
          console.log(res)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  edit: function () {
    let habbit = this.data.habbit
    if (typeof(habbit.images) === 'string') {
      habbit.images = habbit.images ? habbit.images.split(',') : []
    }
    getApp().data.savedhabbit = habbit
    wx.redirectTo({
      url: '../addHabbit/addHabbit'
    })
  },

  del: function () {
    console.log("del")
    // let { uid, timestamp,  token} = getApp().data.key
    let habbit_id = this.data.habbit.id
    wx.showModal({
      title: '删除',
      content: '是否删除该习惯？',
      success (res) {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: getApp().data.domain + 'habbits/delete',
            method: 'GET',
            data: { uid, timestamp, token, habbit_id },
            complete: function () {
              wx.navigateBack()
            }
          })
        }
      }
    })
  },
  
  change: function () {
    this.setData({
      change: !this.data.change
    })
  },

  changeMode: function (event) {
    let mode = event.currentTarget.dataset.mode
    let habbit = this.data.habbit
    habbit.mode = mode
    console.log(habbit.mode)
    this.setData({
      habbit: habbit,
      change: false
    })
    this.updatehabbit()
  },

  updatehabbit: function () {
    let images = this.data.images
    if (typeof (images) === 'object') {
      images = images.join()
    }
    let data = {
      habbit_id: this.data.habbit.id,
      date: this.data.habbit.date,
      title: this.data.habbit.title,
      content: this.data.habbit.content,
      images: images,
      mode: parseInt(this.data.habbit.mode)
    }
    getApp().edithabbit(data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
    // let find = getApp().lodash.find
    // let habbit = find(getApp().data.habbits, (val) => {
    //   return val.id === Number(options.id)
    // })
    // this.setData({
    //   habbit: habbit,
    //   user: getApp().data.user
    // })
    // console.log(habbit)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '习惯详情',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setNavigationBarTitle({
      title: '修改习惯',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return getApp().data.shareMenu
  }
})
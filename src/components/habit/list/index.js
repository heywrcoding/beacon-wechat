const http = require('../../../../utils/http.js');

Component({
  data: {
    list: [],
  },
  methods: {
    getData() {
      // send initial http request here
      http.get('habit').then((res) => {
        this.setData({
          list: res.data,
        });
      });
    },
    increase(idx) {
      console.log('increase', idx);
      const nlist = this.data.list;
      nlist[idx].count++;
      this.setData({
        list: nlist,
      });
      // TODO: wait for backend
      // http.post(`habit/${nlist[idx].id}`).then(res => {
      //   console.log(res.data);
      // });
    },
    habitListTap(e) {
      const { id, idx } = e.currentTarget.dataset;
      switch (e.target.dataset.type) {
        case 'increase':
          this.increase(idx);
          break;
        case 'item':
          // go to detail
          wx.navigateTo({
            url: `/src/pages/habit/detail/index?id=${id}`,
          });
          break;
        default:
          break;
      }
    },
  },
  // show() will run when the page show every times.
  pageLifetimes: {
    show() {
      this.getData();
    }
  },
});

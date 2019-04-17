Component({
  properties: {
    aim: Object,
  },
  data: {
    isExpand: false,
    style: {
      dropDown: 'drop-down-icon',
      child: 'child ripple',
    },
  },
  methods: {
    handleExpand() {
      const isExpand = !this.data.isExpand;
      const { style } = this.data;
      if (isExpand) {
        style.dropDown = 'drop-down-icon rotate180';
      } else {
        style.dropDown = 'drop-down-icon';
      }
      this.setData({
        isExpand,
        style,
      });
    },
  },
});
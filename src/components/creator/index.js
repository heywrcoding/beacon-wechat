Component({
  data: {
    isShow: false,
  },
  methods: {
    switchDisplay() {
      this.setData({
        isShow: !this.data.isShow,
      });
    },
    createHabit() {
      // TODO: nagivate to create habit page
      console.log('new habit');
    },
    createAim() {
      // TODO: nagivate to create aim page
      console.log('new aim');
    },
  },
});

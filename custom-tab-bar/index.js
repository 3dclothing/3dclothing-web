Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      "pagePath": "pages/home/home",
      "text": "广场1",
      "iconPath": "../public/image/menu_1.png",
      "selectedIconPath": "../public/image/menu_1_active.png"
    },
    {
      "pagePath": "pages/fate/fate",
      "text": "缘分1",
      "iconPath": "../public/image/menu_2.png",
      "selectedIconPath": "../public/image/menu_2_active.png"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})
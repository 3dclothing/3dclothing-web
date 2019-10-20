
Page({
  data: {
    expressDetail: {},
    dataReady: false,
  },

  onLoad: function (options) {
    this.getExpressDetail();
  },

  getExpressDetail() {
    let expressDetail = {
      orderNo: '70070615687921375'
    }
    this.setData({
      dataReady: true,
      expressDetail,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页
    console.log('currPage', currPage)
    wx.setNavigationBarTitle({
      title: decodeURIComponent(currPage.options.title),
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  }
})
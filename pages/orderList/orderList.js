import * as Api from '../../service/api.service';

Page({
  data: {
    _active: '1',
    listLikes: [],
  },

  onLoad: function (options) {
    this.setData({
      _active: options.type,
    });
    // this.getUsersListLikes(this.data._active);
  },

  

  onReady: function () {
  },

  /** 获取对应喜欢类别的用户列表 */
  getUsersListLikes(active) {
    let type = 'likeMe';
    switch (active) {
      case '1':
        type = 'likeMe';
        break;
      case '2':
        type = 'meLike';
        break;
      case '3':
        type = 'likeEachOther';
        break;
      default:
        break;
    }
    const params = { type, }
    Api.getUsersListLikes(params).then((result) => {
      if (result) {
        const listLikes = result.data;
        listLikes.forEach((like) => {
          if (like.photos && like.photos.length) {
            like.avatarUrl = like.photos[0]
          }
        })
        
        this.setData({
          listLikes,
        });
      }
    });
  },

  /** 切换tab */
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      _active: index,
    });
    // this.getUsersListLikes(this.data._active);
  },

  /** 详情 */
  userDetail(e) {
    const { openid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../userDetail/userDetail?openid=${openid}`,
    })
    // wx.navigateTo({
    //   url: '../registerPhone/registerPhone',
    // })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
})
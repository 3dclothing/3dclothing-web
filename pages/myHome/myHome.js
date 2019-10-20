
import * as Api from '../../service/api.service';

Page({
  data: {
    user: { openid: '' },
    userInfo: {},
    userStatistics: {},
    pageLoaded: false,
    meLike: 0,
    likeMe: 0,
    likeEachOther: 0,
  },

  onLoad: function () {
    let _this = this
    wx.getStorage({
      key: 'user',
      success: function(res) {
        _this.setData({
          user: res.data
        })
      },
    });
    this.getUserInfo();
    this.getUsersLikeCount();
    this.setData({
      pageLoaded: true,
    })
  },

  /** 获取用户信息 */
  getUserInfo() {
    let _this = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        const { openid } = res.data;
        _this.requestForUserInfo(openid);
      },
    });
  },
  requestForUserInfo(openid) {
    Api.getUserInfo(openid).then((result) => {
      if (result) {
        const userInfo = result.data;
        this.setData({
          userInfo,
          // userStatistics: userInfo.statistics,
        });
        //   wx.setStorage({
        //     key: 'userShopInfo',
        //     data: userInfo,
        //   });
      }
    });
  },

  /** 获取喜欢的类别和数量 */
  getUsersLikeCount() {
    Api.getUsersLikeCount().then((result) => {
      if (result) {
        const usersLikeCount = result.data;
        let meLike, likeMe, likeEachOther;
        usersLikeCount.forEach((e) => {
          if (e.type === "meLike") {
            meLike = e.count;
          } else if (e.type === "likeMe") {
            likeMe = e.count;
          } else {
            likeEachOther = e.count;
          }
        });
        this.setData({
          meLike,
          likeMe,
          likeEachOther,
        });
      }
    });
  },

  /** 订单 */
  goOrderDetail(e) {
    const title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: `../orderDetail/orderDetail?title=${encodeURIComponent(title)}`,
    })
  },

  goExpressDetail() {
    wx.navigateTo({
      url: `../expressDetail/expressDetail`,
    })
  },

  register() {
    wx.navigateTo({
      url: `../register/register`,
    })
  },

  myImages() {
    wx.navigateTo({
      url: `../myImages/myImages`,
    })
  },

  goMatchStandard() {
    wx.navigateTo({
      url: `../registerStandard/registerStandard?type=usercenter`,
    })
  },

  contract() {
    wx.navigateTo({
      url: `../contract/contract`,
    })
  },

  /** 喜欢人列表 */
  goFateList(e) {
    // const id = this.data.userInfo.Shop.id;
    const { type } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../fateList/fateList?type=${type}`,
    })
  },

  onReady: function () {

  },

  onShow: function () {
    const { pageLoaded } = this.data;
    if (pageLoaded) {
      this.getUserInfo();
    }
  },

  onHide: function () {

  },

  onUnload: function () {

  },
})
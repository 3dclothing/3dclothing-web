import * as Api from '../../service/api.service';
const app = getApp();


Page({
  data: {
    userInfo: { constellation: '' },
    psyTest: [],
    currShopList: [],
    dataAlready: false,
    currentCity: '',
    selectValue: '',
    currentQrcode: '',
    currentPhone: '',
    phone: '',
    popHidden: true,
    pageLoaded: false,
    popWechat: false,
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    pullDown: false,
    pullUp: false,
    horoscopeData: {},
    background: ['item-1', 'item-2', 'item-3'],
  },

  onLoad () {
    wx.showTabBar();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      
    }
    let _this = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        _this.setData({
          userInfo: res.data,
        });
      },
    });
  },
  
  
  /** 星座运势 */
  goXzys() {
    wx.navigateTo({
      url: `../xzys/xzys`,
    })
  },

  /** 心理测试列表 */
  goXlcsList() {
    wx.navigateTo({
      url: `../xlcsList/xlcsList`,
    })
  },
  
  /** 心理测试 */
  doTest(e) {
    const {
      id,
      type,
    } = e.currentTarget.dataset;
    if (type === '3') {
      wx.navigateTo({
        url: `../qsqy/qsqy?id=${id}`,
      });
    } else {
      wx.navigateTo({
        url: `../xlcsDetail/xlcsDetail?id=${id}`,
      })
    }
  },

  /** 星座匹配 */
  goMatch() {
    wx.navigateTo({
      url: `../matcheXz/matcheXz`,
    })
  },

  /** 获取用户详细信息 */
  getUserInfo() {
    const { openid } = this.data.userInfo;
    Api.getUserInfo(openid || '').then((result) => {
      if (result) {
        const userInfo = result.data;
        app.globalData.userInfo = result.data;
        console.log('Object.assign({openid}, result.data)', Object.assign({openid}, result.data));
        wx.setStorage({
          key: 'userInfo',
          data: Object.assign({openid}, result.data),
        });
        this.setData({
          userInfo,
          pageLoaded: true,
        });
      }
    });
  },

  topInfo() {
    wx.navigateTo({
      url: '../bar/index'
    })
  },

  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showTabBar();
    if (this.data.pageLoaded === true) {
      this.getUserInfo();
    }
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
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this.setData({
      pullDown: true,
      pullUp: false
    });
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pullDown: false,
      pullUp: true
    });
  },
})
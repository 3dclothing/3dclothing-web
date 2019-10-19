
const app = getApp();
import * as Api from '../../service/api.service';
import config from '../../config';
import {
  cityReplace,
} from '../../utils/utils';

Page({
  data: {
    user: {openid: ''},
    group: {},
    currentCity: '',
    selectValue: '',
    cityList: [],
    hotCityList: [],
    popHidden: true,
    hasStorage: false,
    auth: false,
  },

  onLoad: function (options) {
    if (options.auth) {
      this.setData({
        auth: options.auth
      })
    }
    let _this = this;
    wx.getStorageInfo({
      success(res) {
        if (res.keys.indexOf('user') !== -1 && !_this.data.auth) {
          _this.setData({
            hasStorage: true
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../home/home',
            })
            // wx.navigateTo({
            //   url: '../home/home',
            // })
          }, 1500);
        } else {
          _this.getOpenid();
          // if (app.globalData.userLocation) {
          //   wx.showLoading({
          //     title: '定位中',
          //   })
          //   wx.getLocation({
          //     type: 'wgs84',
          //     success(res) {
          //       _this.getLocalCity(res.latitude, res.longitude);
          //     }
          //   })
          // } else {
          //   _this.getWeChatCity();
          // }
        }
      }
    })
  },

  getOpenid() {
    let _this = this;
    wx.login({
      success: function (data) {
        Api.getOpenid(data.code).then((result) => {
          if (result.code === 200) {
            _this.data.user.openid = result.data.openid;
            _this.setData({
              user: _this.data.user
            });
          } else {
          }
        }).catch(() => {
        })
      },
      fail: function (err) {
        console.log('wx login failed', err)
      }
    })
  },

  /** 获取定位 */
  getWeChatCity() {
    let _this = this
    wx.authorize({
      scope: "scope.userLocation",
      success() {
        wx.showLoading({
          title: '定位中',
        })
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            app.globalData.userLocation = true;
            _this.getLocalCity(res.latitude, res.longitude);
          },
          fail() {
            _this.setData({
              currentCity: "定位失败"
            });
          }
        })
      }
    });
  },

  /**
   * 获取定位城市
   * @param latitude 经度
   * @param longitude 纬度
   */
  getLocalCity(latitude, longitude) {
    let _this = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + config.ak +'&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        let city = res.data.result.addressComponent.city;
        city = cityReplace(city);
        _this.setData({
          currentCity: city
        });
        wx.setStorage({
          key: 'currentCity',
          data: city,
        });
        wx.hideLoading();
      },
      fail: function () {
        _this.setData({
          currentCity: "---"
        });
        wx.hideLoading();
      },
    })
  },

  /** 控制picker */
  popPicker() {
    let popHidden = this.data.popHidden;
    this.setData({
      popHidden: !popHidden,
    })
  },

  /**
   * 获取授权和用户信息
   * 创建用户（后端判断是否已经创建）
   * 跳转广场tabBar页
  */
  getUser(e) {
    let userInfo= e.detail.userInfo;
    userInfo.openid = this.data.user.openid;
    console.log('userInfo', e.detail.userInfo);
    if (!userInfo.openid) {
      return;
    }
    Api.register(userInfo).then((result) => {
      if (result.code === 200) {
        userInfo.token = result.data.token;
        wx.setStorage({
          key: "user",
          data: userInfo,
          success: () => {
            wx.switchTab({
              url: `../home/home`,
            });
          }
        });
      }
    }).catch(() => {
      console.log('取消授权，留在本页')
    });
  },

  openDoc(e) {
    console.log(e);
  },

  onReady: function () {
  },
})
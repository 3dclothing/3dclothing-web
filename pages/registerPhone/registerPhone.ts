import * as Api from '../../service/api.service';
import * as utils from '../../utils/utils';

import { IMyApp } from '../../app';
const app = getApp<IMyApp>()

Page({
  data: {
    motto: '点击 “编译” 以构建',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    smsDisable: false,
    smsTime: 59,
    phone: '',
    submitDisable: false,
  },
  
  onLoad() {
    this.setData!({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true,
    });
  },

  bindPhoneInput(e: any) {
    this.setData!({
      phone: e.detail.value
    })
  },

  getPhoneCode(): any {
    const { phone } = this.data;
    if (!utils.validateEmpty(phone, '请输入手机号')) {
      return false;
    }
    Api.sendSms({ phone }).then((result: any) => {
      if (result.code === 200) {
        this.setData!({
          smsDisable: true,
        });
        let smsTime = 59;
        const smsInterval = setInterval(() => {
          if (smsTime === 0) {
            console.log('smsTime', smsTime);
            this.setData!({
              smsDisable: false,
            })
            clearInterval(smsInterval);
            return;
          }
          smsTime--;
          this.setData!({
            smsTime,
          });
        }, 1000)
      }
    });
  },

  goRegister(): void {
    wx.navigateTo({
      url: '../registerphone/registerphone'
    })
  },

  goHome(): void {
    console.log('goHome');
    // wx.switchTab({
    //   url: '../home/home'
    // })
    wx.navigateTo({
      url: '../home/home'
    })
  },

  /** 
   * （未授权）手动唤起授权
   */
  getUserInfo(e: any) {
    console.log('getUserInfo:', e);
    app.globalData.userInfo = e.detail.userInfo
    this.setData!({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.IsFirstTime() ? this.goRegister() : this.goHome();
  },

  /** 是否首次 */
  IsFirstTime(): Boolean {
    return false
  },

  jumpOver(): void {
    wx.navigateTo({
      url: '../home/home',
    })
  },

  next(): void {
    wx.navigateTo({
      url: '../matching/matching',
    })
  },
   
  formSubmit(e: any): any {
    this.setData!({
      submitDisable: true
    }); 
    const params = e.detail.value
    if (!utils.validateEmpty(params.phone, '请输入手机号') ||
      !utils.validateEmpty(params.code, '请输入验证码')) {
      return false;
    }
    Api.addPhone(params).then((result: any) => {
      this.setData!({
        submitDisable: true
      });  
      if (result.code === 200) {
        wx.navigateTo({
          url: '../matching/matching',
        });
      } else {
        this.setData!({
          submitDisable: false
        }); 
        utils.showModal(result.message);
      }
    })
  },

  formReset(): void {
    console.log('form发生了reset事件')
  }
  
})

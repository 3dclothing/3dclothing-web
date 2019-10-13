import * as Api from '../../service/api.service';
import * as utils from '../../utils/utils';
import { IMyApp } from '../../app';
const app: any = getApp<IMyApp>();

Page({
  data: {
    submitDisable: false,
    salary: '',
    salaryArray: [
      '5千以下', '5千～1万', '1万～2万', '2万～5万', '5万以上'
    ],
  },
  
  onLoad: function (options: any) {
    console.log(options);
  },

  /** 年龄身高收入 */
  submit(e: any): any {
    const params = e.detail.value;
    if (!utils.validateEmpty(params.age, '请输入年龄') ||
      !utils.validateEmpty(params.height, '请输入年龄') ||
      !utils.validateEmpty(this.data.salary, '请输入收入')) {
      return false;
    }
    const openid = app.globalData.userInfo.openid;
    this.setData!({
      submitDisable: true
    });
    Api.updateUser(Object.assign({ openid }, params,)).then((result: any) => {
      wx.hideLoading();
      this.setData!({
        submitDisable: true
      });
      if (result.code === 200) {
        wx.navigateTo({
          url: `../registerStandard/registerStandard`,
        });
      } else {
        utils.showModal('系统异常，请稍后再试');
      }
    })
  },

  jumpOver(): void {
    wx.navigateTo({
      url: '../home/home',
    })
  },

  next(): void {
    console.log('next');
    wx.navigateTo({
      url: '../registerPhone/registerPhone',
    })
  },

  /** 月收入 */
  bindSalaryChange(e: any) {
    const { salaryArray } = this.data
    this.setData!({
      salary: salaryArray[e.detail.value]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
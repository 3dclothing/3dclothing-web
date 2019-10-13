// import apiServicePro = require('../../service/api.service');
import uploadImage from '../../utils/oss';
import env from '../../config';
// import { IMyApp } from '../../app';
// const app:any = getApp<IMyApp>();
let user:any
// import * as utils from '../../utils/utils';
import * as Api from '../../service/api.service';
Page({
  data: {
    user: { openid : ''},
    carId: '',
    shopId: '',
    brand: '',            // 品牌
    brandDetail: '',      // 二级车系
    price: '',            // 价格
    dateCard: '',         // 上牌时间
    kilometer: '',        // 行驶里程
    transfersNumber: '',  // 过户次数
    statusValue: '在售',
    status: 1,
    introduce: '',        // 车况
    note: '',
    leftLenth: 300,
    indexImage: '',
    uploadIndexPath: '',
    oldImages: [],        // 更新汽车图片
    uploadImgs: [],       // 图片
    count: 9,
    city: '',             // 上牌地点
    // cityId: '',
    selectValue: '',
    cityList: [],
    hotCityList: [],
    popHidden: true,
    brandList: [],
    hotBrandList: [],
    dateNow: '',
    popHiddenBrand: true,
    submitDisable: false,
    statusArray: [
      { code: 0, value: '已出售' },
      { code: 1, value: '在售' }
    ],
    introArray: [
      'A、优秀（车况好，没有任何事故）',
      'B、良好（有少量剐蹭或钣金）',
      'C、一般（有过前后轻碰撞事故）',
      'D、较差（有发生过伤及主体框架的碰撞或较重事故）']
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function () {
    let self = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('res', res)
        Api.getUserInfo(res.data.openid).then((result: any) => {
          console.log('1212', result)
          if (result) {
            user = result.data
            console.log(' result', result.data.photos)
            self.setData!({
              oldImages: result.data.photos,
            });
          }
        });
      }
    })
  
  },

  getYMD(dateStr: string) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    month  = month <= 9 ? `0${month}` : month;
    let day: any = date.getDate();
    day = day <= 9 ? `0${day}` : day;
    return `${year}-${month}-${day}`
  },

  /** 准备提交 */
  onSubmit(): any {
    let that = this;
    // const value = e.detail.value;
    const openid = this.data.user.openid;
    const aliyunServerURL = env.uploadImageUrl;

   

    let indexImage = this.data.indexImage;
    let uploadIndexPath = this.data.uploadIndexPath;
    if (uploadIndexPath !== '') {
      console.log('are you ok...')
      uploadImage({
        filePath: indexImage,
        dir: `images/shop/${openid}/` + indexImage.replace('http://tmp/', ''),
        success: function (res: any) {
          console.log('indexImage', indexImage)
          indexImage = `${aliyunServerURL}/${res}`;
          that.uploadAndSubmit();
        },
        fail: function () {
          that.uploadAndSubmit();
        }
      });
    } else {
      that.uploadAndSubmit();
    }
  },

  uploadAndSubmit() {
    const openid = this.data.user.openid;
    const aliyunServerURL = env.uploadImageUrl;
    let that = this;
    let count = 0;
    let images: any[] = [];
    let uploadImgs: any[] = this.data.uploadImgs;
    wx.showLoading({
      title: '',
    })
    if (uploadImgs.length > 0) {
      for (let i = 0; i < uploadImgs.length; i++) {
        let filePath = uploadImgs[i];
        uploadImage({
          filePath: filePath,
          dir: `images/shop/${openid}/` + filePath.replace('http://tmp/', ''),
          success: function (res: any) {
            count++;
            images.push(`${aliyunServerURL}/${res}`);
            console.log("images", images);
            wx.hideLoading();
            
            if (count === uploadImgs.length) {
                images = images.concat(that.data.oldImages);
                that.updateUserImage(images);
            } else {
              wx.hideLoading();
            }
          },
          fail: function () {
            wx.hideLoading();
          }
        });
      }
    } else {
        images = images.concat(that.data.oldImages);  // 合并编辑之前的汽车图片
        that.updateUserImage(images);
      wx.hideLoading();
    }
  },

  updateUserImage(images:Array<any>) {
    console.log('images', images)
    Api.updateUser({ openid: user.openid, photos: images}).then((result) => {
      console.log("result",result)
    })
  },


  /** 删除上传照片 */
  delImage(e:any) {
    const array = e.currentTarget.dataset.array;
    const index = e.currentTarget.dataset.index;
    if (array === 'oldImages') {
      const oldImages = this.data.oldImages;
      oldImages.splice(index, 1);
      this.setData!({
        oldImages
      });
    } else {
      const uploadImgs = this.data.uploadImgs;
      uploadImgs.splice(index, 1);
      this.setData!({
        uploadImgs
      });
    }
  },

  chooseIndexImage() {
    this.chooseImage(1, 'one');
  },

  chooseOtherImage(e: any) {
    const selectPictureNum = e.target.dataset.num;
    let count = 99 - selectPictureNum
    this.chooseImage(count, 'multi');
  },

  /** 选择图片
   *  @type multi-多张图片 one-一张图片
   */
  chooseImage(count: number, type: string) {
    const that = this;
    wx.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res: any) {
        let uploadImgs = that.data.uploadImgs;
        if (type === 'multi') {
          that.setData!({
            uploadImgs: uploadImgs.concat(res.tempFilePaths),
          });
        } else {
          that.setData!({
            uploadIndexPath: res.tempFilePaths[0],
            indexImage: res.tempFilePaths[0],
          });
        }
      },
    })
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
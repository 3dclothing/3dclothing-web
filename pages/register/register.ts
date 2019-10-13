
import * as Api from '../../service/api.service';
import * as utils from '../../utils/utils';
import jobJson from '../../public/json/jobJson';
import { IMyApp } from '../../app';
const app = getApp<IMyApp>();

Page({
  data: {
    userInfo: { openid: '' },
    nickName: '',
    weChatId: '', // 微信号
    gender: '', 
    birth: '',    // 生日
    height: '',   // 身高
    salary: '', 
    region: [],
    workCity: '',
    workProvince: '',
    workRegion: '',
    isMarriage: '',
    education: '', 
    hasChild: '', 
    wantChild: '', 
    jobGeneral: '',
    jobDetail: '',
    haveHouse: '',   
    genderIndex: 0,
    salaryIndex: 0,
    dateNow: '',
    submitDisable: false,
    isMarriageArray: ['未婚', '离婚'],
    genderArray: ['男','女'],
    salaryArray: [
      '5千以下', '5千～1万', '1万～2万', '2万～5万', '5万以上'
    ],
    educationArray: [
      '小学', '初中', '高中', '大专', '大学本科', '硕士', '博士'
    ],
    hasChildArray: ['否', '是'],
    wantChildArray: ['是', '否'],
    haveHouseArray: ['已买房', '未买房'],
    multiIndex: [, ],
    multiArray: [[],[]] as any,
    jobJson: jobJson,
  },

  onLoad: function () {
    const multiArray = [[], []] as any;
    jobJson.data.forEach((item: any) => {
      multiArray[0].push(item.name);
    });
    jobJson.data[0].data.forEach((item: any) => {
      multiArray[1].push(item.name);
    });
    console.log(multiArray);
    this.setData!({
      multiArray,
      dateNow: this.getYMD(new Date())
    });
    this.getUserInfo();
  },

  /** 用户详情 */
  getUserInfo() {
    const openid = app.globalData.userInfo.openid;
    Api.getUserInfo(openid || '').then((result: any) => {
      if (result) {
        this.setData!({
          userInfo: result.data,
          nickName: result.data.nickName,
          weChatId: result.data.weChatId,
          gender: result.data.gender,
          birth: result.data.birth?this.getYMD(result.data.birth):'',        // 生日
          height: result.data.height,                   // 身高
          salary: result.data.salary,
          workProvince: result.data.workProvince,
          workCity: result.data.workCity,
          workRegion: result.data.workRegion,        
          isMarriage: result.data.isMarriage,           // 婚姻状况
          education: result.data.education,             // 教育
          hasChild: result.data.hasChild,
          wantChild: result.data.wantChild,
          jobGeneral: result.data.jobGeneral,
          jobDetail: result.data.jobDetail,
          haveHouse: result.data.haveHouse,
        });
        console.log('data', this.data);
      }
    })
  },

  getYMD(dateStr: any) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monthStr = month <= 9 ? `0${month}` : month;
    let day = date.getDate();
    let dayStr = day <= 9 ? `0${day}` : day;
    return `${year}-${monthStr}-${dayStr}`
  },

  /** 准备提交 */
  onSubmit(e: any): any {
    let that = this;
    const value = e.detail.value;

    if (!utils.validateEmpty(value.nickName, '请输入昵称') ||
      (!utils.validateEmpty(value.weChatId, '请输入微信号') ||
      !utils.validateEmpty(value.gender, '请选择性别') ||
      !utils.validateEmpty(value.birth, '请选择生日') ||
      !utils.validateEmpty(value.height, '请输入身高') ||
      !utils.validateEmpty(value.salary, '请选择收入') ||
      !utils.validateEmpty(this.data.workProvince, '请选择工作所在地') ||
      !utils.validateEmpty(this.data.education, '请选择学历') ||
      !utils.validateEmpty(this.data.isMarriage, '请选择婚姻状况') ||
      !utils.validateEmpty(this.data.hasChild, '请选择是否有孩子') ||
      !utils.validateEmpty(this.data.wantChild, '请选择是否想要孩子') ||
      // !utils.validateEmpty(this.data.jobGeneral, '请选择职业') ||
      !utils.validateEmpty(this.data.haveHouse, '请选择买房情况')) {

      return false;
    }

    that.doSubmit(e);
  },

  /** update */
  doSubmit(e: any) {
    const params = e.detail.value;
    console.log(e.detail.value);
    const { userInfo } = this.data;
    const dataParams = {
      workProvince: this.data.workProvince,
      workCity: this.data.workCity,
      workRegion: this.data.workRegion,
      jobGeneral: this.data.jobGeneral,
      jobDetail: this.data.jobDetail,
    }
    this.setData!({
      submitDisable: true
    });
    console.log(Object.assign(userInfo, params, dataParams));
    Api.updateUser(Object.assign(userInfo, params, dataParams)).then((result: any) => {
      wx.hideLoading(); 
      this.setData!({
        submitDisable: true
      });     
      if (result.code === 200) {
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
        setTimeout(() => {
          wx.switchTab({
            url: `../myHome/myHome`,
          });
        }, 1000);
      } else {
        utils.showModal('系统异常，请稍后再试');
      }
    })
  },

  /** 生日 */
  bindBirthChange(e: any) {
    this.setData!({
      birth: e.detail.value
    })
  },

  bindEducationChange(e: any) {
    const { educationArray } = this.data
    this.setData!({
      education: educationArray[e.detail.value]
    })
  },

  /** 婚姻 */
  bindMarriageChange(e: any) {
    const { isMarriageArray } = this.data
    this.setData!({
      isMarriage: isMarriageArray[e.detail.value]
    })
  },

  bindHasChildChange(e: any) {
    const { hasChildArray } = this.data
    this.setData!({
      hasChild: hasChildArray[e.detail.value]
    })
  },

  bindWantChildChange(e: any) {
    const { wantChildArray } = this.data
    this.setData!({
      wantChild: wantChildArray[e.detail.value]
    })
  },

  /** 买房 */
  bindHaveHouseChange(e: any) {
    const { haveHouseArray } = this.data
    this.setData!({
      haveHouse: haveHouseArray[e.detail.value]
    })
  },

  /** 性别 */
  bindGenderChange(e: any) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData!({
      gender: parseInt(e.detail.value) + 1
    });
    console.log('parseInt(e.detail.value)', (parseInt(e.detail.value) + 1))
  },

  /** 月收入 */
  bindSalaryChange(e: any) {
    const { salaryArray } = this.data
    this.setData!({
      salary: salaryArray[e.detail.value]
    });
  },

  /** 工作地区 */
  bindRegionChange: function (e:any) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let region = e.detail.value;
    this.setData!({
      region,
      workProvince: region[0],
      workCity: region[1],
      workRegion: region[2],
    });
  },

  bindMultiPickerChange: function (e: any) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    const { multiArray } = this.data;
    let multiIndex = e.detail.value;
    this.setData!({
      multiIndex,
      jobGeneral: multiArray[0][multiIndex[0]],
      jobDetail: multiArray[1][multiIndex[1]],
    })
  },

  bindMultiPickerColumnChange: function (e: any) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    const { multiArray, multiIndex } = this.data;
    multiIndex[e.detail.column] = e.detail.value;
    if (e.detail.column === 0) {
      multiArray[1] = [];
      console.log(jobJson.data[multiIndex[0] || 0].data);
      jobJson.data[multiIndex[0] || 0].data.forEach((item: any) => {
        multiArray[1].push(item.name);
      });
    }
    this.setData!({
      multiArray,
      // multiIndex,
    });
  },
  bindDateChange: function (e:any) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData!({
      date: e.detail.value
    })
  },
 
})
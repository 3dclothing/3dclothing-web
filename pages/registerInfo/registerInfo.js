"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api = require("../../service/api.service");
const utils = require("../../utils/utils");
const app = getApp();
Page({
    data: {
        submitDisable: false,
        salary: '',
        salaryArray: [
            '5千以下', '5千～1万', '1万～2万', '2万～5万', '5万以上'
        ],
    },
    onLoad: function (options) {
        console.log(options);
    },
    submit(e) {
        const params = e.detail.value;
        if (!utils.validateEmpty(params.age, '请输入年龄') ||
            !utils.validateEmpty(params.height, '请输入年龄') ||
            !utils.validateEmpty(this.data.salary, '请输入收入')) {
            return false;
        }
        const openid = app.globalData.userInfo.openid;
        this.setData({
            submitDisable: true
        });
        Api.updateUser(Object.assign({ openid }, params)).then((result) => {
            wx.hideLoading();
            this.setData({
                submitDisable: true
            });
            if (result.code === 200) {
                wx.navigateTo({
                    url: `../registerStandard/registerStandard`,
                });
            }
            else {
                utils.showModal('系统异常，请稍后再试');
            }
        });
    },
    jumpOver() {
        wx.navigateTo({
            url: '../home/home',
        });
    },
    next() {
        console.log('next');
        wx.navigateTo({
            url: '../registerPhone/registerPhone',
        });
    },
    bindSalaryChange(e) {
        const { salaryArray } = this.data;
        this.setData({
            salary: salaryArray[e.detail.value]
        });
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onReachBottom: function () {
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJJbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXJJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQWlEO0FBQ2pELDJDQUEyQztBQUUzQyxNQUFNLEdBQUcsR0FBUSxNQUFNLEVBQVUsQ0FBQztBQUVsQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixhQUFhLEVBQUUsS0FBSztRQUNwQixNQUFNLEVBQUUsRUFBRTtRQUNWLFdBQVcsRUFBRTtZQUNYLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNO1NBQzFDO0tBQ0Y7SUFFRCxNQUFNLEVBQUUsVUFBVSxPQUFZO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUdELE1BQU0sQ0FBQyxDQUFNO1FBQ1gsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7WUFDM0MsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO1lBQzVDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNqRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixhQUFhLEVBQUUsSUFBSTtTQUNwQixDQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO1lBQ3RFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBUSxDQUFDO2dCQUNaLGFBQWEsRUFBRSxJQUFJO2FBQ3BCLENBQUMsQ0FBQztZQUNILElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ1osR0FBRyxFQUFFLHNDQUFzQztpQkFDNUMsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMvQjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFFBQVE7UUFDTixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLGNBQWM7U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELElBQUk7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsZ0NBQWdDO1NBQ3RDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFHRCxnQkFBZ0IsQ0FBQyxDQUFNO1FBQ3JCLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3BDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFLRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7SUFFVixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBcGkgZnJvbSAnLi4vLi4vc2VydmljZS9hcGkuc2VydmljZSc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnO1xuY29uc3QgYXBwOiBhbnkgPSBnZXRBcHA8SU15QXBwPigpO1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHN1Ym1pdERpc2FibGU6IGZhbHNlLFxuICAgIHNhbGFyeTogJycsXG4gICAgc2FsYXJ5QXJyYXk6IFtcbiAgICAgICc15Y2D5Lul5LiLJywgJzXljYPvvZ4x5LiHJywgJzHkuIfvvZ4y5LiHJywgJzLkuIfvvZ415LiHJywgJzXkuIfku6XkuIonXG4gICAgXSxcbiAgfSxcbiAgXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnM6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuICB9LFxuXG4gIC8qKiDlubTpvoTouqvpq5jmlLblhaUgKi9cbiAgc3VibWl0KGU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgcGFyYW1zID0gZS5kZXRhaWwudmFsdWU7XG4gICAgaWYgKCF1dGlscy52YWxpZGF0ZUVtcHR5KHBhcmFtcy5hZ2UsICfor7fovpPlhaXlubTpvoQnKSB8fFxuICAgICAgIXV0aWxzLnZhbGlkYXRlRW1wdHkocGFyYW1zLmhlaWdodCwgJ+ivt+i+k+WFpeW5tOm+hCcpIHx8XG4gICAgICAhdXRpbHMudmFsaWRhdGVFbXB0eSh0aGlzLmRhdGEuc2FsYXJ5LCAn6K+36L6T5YWl5pS25YWlJykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3Qgb3BlbmlkID0gYXBwLmdsb2JhbERhdGEudXNlckluZm8ub3BlbmlkO1xuICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgc3VibWl0RGlzYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEFwaS51cGRhdGVVc2VyKE9iamVjdC5hc3NpZ24oeyBvcGVuaWQgfSwgcGFyYW1zLCkpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgIHN1Ym1pdERpc2FibGU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3VsdC5jb2RlID09PSAyMDApIHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBgLi4vcmVnaXN0ZXJTdGFuZGFyZC9yZWdpc3RlclN0YW5kYXJkYCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1dGlscy5zaG93TW9kYWwoJ+ezu+e7n+W8guW4uO+8jOivt+eojeWQjuWGjeivlScpO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAganVtcE92ZXIoKTogdm9pZCB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi9ob21lL2hvbWUnLFxuICAgIH0pXG4gIH0sXG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnbmV4dCcpO1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vcmVnaXN0ZXJQaG9uZS9yZWdpc3RlclBob25lJyxcbiAgICB9KVxuICB9LFxuXG4gIC8qKiDmnIjmlLblhaUgKi9cbiAgYmluZFNhbGFyeUNoYW5nZShlOiBhbnkpIHtcbiAgICBjb25zdCB7IHNhbGFyeUFycmF5IH0gPSB0aGlzLmRhdGFcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIHNhbGFyeTogc2FsYXJ5QXJyYXlbZS5kZXRhaWwudmFsdWVdXG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxufSkiXX0=
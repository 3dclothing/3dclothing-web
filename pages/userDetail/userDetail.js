"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api = require("../../service/api.service");
Page({
    data: {
        openid: '',
        userInfo: {},
    },
    onLoad: function (options) {
        this.setData({
            openid: options.openid,
        });
        this.getUserInfo(options.openid);
    },
    getUserInfo(openid) {
        Api.getUserInfo(openid).then((result) => {
            if (result.code == 200) {
                const userInfo = result.data;
                userInfo.intro = [];
                if (userInfo.age) {
                    userInfo.intro.push(userInfo.age);
                }
                if (userInfo.jobGeneral) {
                    userInfo.intro.push(userInfo.jobGeneral);
                }
                if (userInfo.jobDetail) {
                    userInfo.intro.push(userInfo.jobDetail);
                }
                if (userInfo.education) {
                    userInfo.intro.push(userInfo.education);
                }
                userInfo.intro = userInfo.intro.join(' | ');
                this.setData({
                    userInfo,
                });
            }
        });
    },
    putUsersLike() {
        console.log('putUsersLike');
        const { openid } = this.data;
        Api.putUsersLike(openid).then((result) => {
            if (result.code == 200) {
                wx.showToast({
                    title: '收藏成功',
                    icon: 'success',
                });
            }
        });
    },
    matchMaker() {
        wx.navigateTo({
            url: '../matchmaker/matchmaker',
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXJEZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFHakQsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsRUFBUztLQUNwQjtJQUVELE1BQU0sRUFBRSxVQUFVLE9BQVk7UUFDNUIsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBR0QsV0FBVyxDQUFDLE1BQWM7UUFDeEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUMzQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFO2dCQUN0QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUM3QixRQUFRLENBQUMsS0FBSyxHQUFJLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFDO29CQUNmLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDbEM7Z0JBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO29CQUN2QixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7aUJBQ3pDO2dCQUNELElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtvQkFDdEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2lCQUN4QztnQkFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7b0JBQ3RCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtpQkFDeEM7Z0JBQ0QsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDN0MsSUFBSSxDQUFDLE9BQVEsQ0FBQztvQkFDWixRQUFRO2lCQUNULENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0QsWUFBWTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDN0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUM1QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFO2dCQUN0QixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxNQUFNO29CQUNiLElBQUksRUFBRSxTQUFTO2lCQUNoQixDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVU7UUFDUixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLDBCQUEwQjtTQUNoQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsT0FBTyxFQUFFO0lBQ1QsQ0FBQztJQUdELE1BQU0sRUFBRTtJQUNSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztDQUVGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFwaSBmcm9tICcuLi8uLi9zZXJ2aWNlL2FwaS5zZXJ2aWNlJzsgXG5cblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBvcGVuaWQ6ICcnLFxuICAgIHVzZXJJbmZvOiB7fSBhcyBhbnksXG4gIH0sXG5cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9uczogYW55KSB7XG4gICAgdGhpcy5zZXREYXRhISh7XG4gICAgICBvcGVuaWQ6IG9wdGlvbnMub3BlbmlkLFxuICAgIH0pO1xuICAgIHRoaXMuZ2V0VXNlckluZm8ob3B0aW9ucy5vcGVuaWQpO1xuICB9LFxuXG4gIC8qKiDojrflj5bnlKjmiLfkv6Hmga8gKi9cbiAgZ2V0VXNlckluZm8ob3BlbmlkOiBzdHJpbmcpIHtcbiAgICBBcGkuZ2V0VXNlckluZm8ob3BlbmlkKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgaWYgKHJlc3VsdC5jb2RlID09IDIwMCkge1xuICAgICAgICBjb25zdCB1c2VySW5mbyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICB1c2VySW5mby5pbnRybyAgPSBbXTtcbiAgICAgICAgICBpZiAodXNlckluZm8uYWdlKXtcbiAgICAgICAgICAgIHVzZXJJbmZvLmludHJvLnB1c2godXNlckluZm8uYWdlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodXNlckluZm8uam9iR2VuZXJhbCkge1xuICAgICAgICAgICAgdXNlckluZm8uaW50cm8ucHVzaCh1c2VySW5mby5qb2JHZW5lcmFsKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodXNlckluZm8uam9iRGV0YWlsKSB7XG4gICAgICAgICAgICB1c2VySW5mby5pbnRyby5wdXNoKHVzZXJJbmZvLmpvYkRldGFpbClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHVzZXJJbmZvLmVkdWNhdGlvbikge1xuICAgICAgICAgICAgdXNlckluZm8uaW50cm8ucHVzaCh1c2VySW5mby5lZHVjYXRpb24pXG4gICAgICAgICAgfVxuICAgICAgICAgIHVzZXJJbmZvLmludHJvID0gdXNlckluZm8uaW50cm8uam9pbignIHwgJylcbiAgICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgdXNlckluZm8sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8qKiDlhbPms6go5pS26JePKeaOpeWPoyAqL1xuICBwdXRVc2Vyc0xpa2UoKSB7XG4gICAgY29uc29sZS5sb2coJ3B1dFVzZXJzTGlrZScpO1xuICAgIGNvbnN0IHsgb3BlbmlkIH0gPSB0aGlzLmRhdGE7XG4gICAgQXBpLnB1dFVzZXJzTGlrZShvcGVuaWQpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICBpZiAocmVzdWx0LmNvZGUgPT0gMjAwKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfmlLbol4/miJDlip8nLFxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgbWF0Y2hNYWtlcigpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL21hdGNobWFrZXIvbWF0Y2htYWtlcicsXG4gICAgfSlcbiAgfSxcblxuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gIH0sXG5cblxuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbn0pIl19
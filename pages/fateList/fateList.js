"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api = require("../../service/api.service");
Page({
    data: {
        _active: '1',
        listLikes: [],
    },
    onLoad: function (options) {
        this.setData({
            _active: options.type,
        });
        this.getUsersListLikes(this.data._active);
    },
    onReady: function () {
    },
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
        const params = { type, };
        Api.getUsersListLikes(params).then((result) => {
            if (result) {
                const listLikes = result.data;
                listLikes.forEach((like) => {
                    if (like.photos && like.photos.length) {
                        like.avatarUrl = like.photos[0];
                    }
                });
                this.setData({
                    listLikes,
                });
            }
        });
    },
    switchTab(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            _active: index,
        });
        this.getUsersListLikes(this.data._active);
    },
    userDetail(e) {
        const { openid } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `../userDetail/userDetail?openid=${openid}`,
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF0ZUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYXRlTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUFpRDtBQUVqRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsR0FBRztRQUNaLFNBQVMsRUFBRSxFQUFXO0tBQ3ZCO0lBRUQsTUFBTSxFQUFFLFVBQVUsT0FBWTtRQUM1QixJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1osT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFJRCxPQUFPLEVBQUU7SUFDVCxDQUFDO0lBR0QsaUJBQWlCLENBQUMsTUFBYztRQUM5QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUM7UUFDcEIsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEdBQUc7Z0JBQ04sSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDaEIsTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixJQUFJLEdBQUcsUUFBUSxDQUFDO2dCQUNoQixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLElBQUksR0FBRyxlQUFlLENBQUM7Z0JBQ3ZCLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7UUFDRCxNQUFNLE1BQU0sR0FBRyxFQUFFLElBQUksR0FBRyxDQUFBO1FBQ3hCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUNqRCxJQUFJLE1BQU0sRUFBRTtnQkFDVixNQUFNLFNBQVMsR0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7b0JBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTt3QkFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUNoQztnQkFDSCxDQUFDLENBQUMsQ0FBQTtnQkFFRixJQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLFNBQVM7aUJBQ1YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFHRCxTQUFTLENBQUMsQ0FBTTtRQUNkLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1osT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsVUFBVSxDQUFDLENBQU07UUFDZixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDM0MsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxtQ0FBbUMsTUFBTSxFQUFFO1NBQ2pELENBQUMsQ0FBQTtJQUlKLENBQUM7SUFNRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFwaSBmcm9tICcuLi8uLi9zZXJ2aWNlL2FwaS5zZXJ2aWNlJztcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBfYWN0aXZlOiAnMScsXG4gICAgbGlzdExpa2VzOiBbXSBhcyBhbnlbXSxcbiAgfSxcblxuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zOiBhbnkpIHtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIF9hY3RpdmU6IG9wdGlvbnMudHlwZSxcbiAgICB9KTtcbiAgICB0aGlzLmdldFVzZXJzTGlzdExpa2VzKHRoaXMuZGF0YS5fYWN0aXZlKTtcbiAgfSxcblxuICBcblxuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gIH0sXG5cbiAgLyoqIOiOt+WPluWvueW6lOWWnOasouexu+WIq+eahOeUqOaIt+WIl+ihqCAqL1xuICBnZXRVc2Vyc0xpc3RMaWtlcyhhY3RpdmU6IHN0cmluZykge1xuICAgIGxldCB0eXBlID0gJ2xpa2VNZSc7XG4gICAgc3dpdGNoIChhY3RpdmUpIHtcbiAgICAgIGNhc2UgJzEnOlxuICAgICAgICB0eXBlID0gJ2xpa2VNZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnMic6XG4gICAgICAgIHR5cGUgPSAnbWVMaWtlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICczJzpcbiAgICAgICAgdHlwZSA9ICdsaWtlRWFjaE90aGVyJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zID0geyB0eXBlLCB9XG4gICAgQXBpLmdldFVzZXJzTGlzdExpa2VzKHBhcmFtcykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgY29uc3QgbGlzdExpa2VzOmFueSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICBsaXN0TGlrZXMuZm9yRWFjaCgobGlrZTogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGxpa2UucGhvdG9zICYmIGxpa2UucGhvdG9zLmxlbmd0aCkge1xuICAgICAgICAgICAgbGlrZS5hdmF0YXJVcmwgPSBsaWtlLnBob3Rvc1swXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgIGxpc3RMaWtlcyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqIOWIh+aNonRhYiAqL1xuICBzd2l0Y2hUYWIoZTogYW55KSB7XG4gICAgY29uc3QgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIF9hY3RpdmU6IGluZGV4LFxuICAgIH0pO1xuICAgIHRoaXMuZ2V0VXNlcnNMaXN0TGlrZXModGhpcy5kYXRhLl9hY3RpdmUpO1xuICB9LFxuXG4gIC8qKiDor6bmg4UgKi9cbiAgdXNlckRldGFpbChlOiBhbnkpIHtcbiAgICBjb25zdCB7IG9wZW5pZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IGAuLi91c2VyRGV0YWlsL3VzZXJEZXRhaWw/b3BlbmlkPSR7b3BlbmlkfWAsXG4gICAgfSlcbiAgICAvLyB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAvLyAgIHVybDogJy4uL3JlZ2lzdGVyUGhvbmUvcmVnaXN0ZXJQaG9uZScsXG4gICAgLy8gfSlcbiAgfSxcblxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG59KSJdfQ==
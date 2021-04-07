
const app = getApp()

Page({

  data: {
    currentUser: null
  },

  onLoad: function (options) {
      this.setData({
        currentUser: app.globalData.userInfo
      })
  },

  userInfoHandler: function(userInfo) {
    let self = this
    wx.BaaS.auth.loginWithWechat(userInfo).then(
      (res) => {
      console.log('userInfo', res);
      self.setData({currentUser: res});
      wx.setStorageSync('userInfo', res)
      },
      err => {
        console.log('something went wrong!', err)
    })
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
})
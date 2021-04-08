// pages/home/home.js
const app = getApp()

Page({

  data: {
    posts: [],
    currentUser: null
  },

  onLoad: function (options) {

    this.setData({
      currentUser: app.globalData.userInfo
    })

    const self = this
    let Posts = new wx.BaaS.TableObject('posts_xhs')

    Posts.expand('user_id').find().then(
      (res) => { 
        console.log('your post has been loaded',res)
        self.setData({
          posts: res.data.objects
        })
      }, (err) => {
        console.log('your post failed',err)
      }
    )
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
  },

  navigateToPost: function(e) {
    console.log('calling a post', e)
    wx.navigateTo({
      url: `/pages/show/show?id=${e.currentTarget.dataset.id}`,
    })
  }
})
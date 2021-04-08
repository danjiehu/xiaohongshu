// pages/user/user.js
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
  }
})
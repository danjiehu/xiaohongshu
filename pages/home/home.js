// pages/home/home.js
Page({

  data: {
    posts: [],
    currentUser: null
  },

  onLoad: function (options) {
    const self = this
    let Posts = new wx.BaaS.TableObject('posts_xhs')

    Posts.find().then(
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
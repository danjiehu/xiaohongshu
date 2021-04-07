// pages/show/show.js

const app = getApp()

Page({

  data: {
    currentUser: null,
    post: [],
    comments: [],
    likes: []
  },

  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })

    let Posts = new wx.BaaS.TableObject('posts_xhs')
    
    const self = this
    Posts.expand('user_id').get(options.id).then(
      (res) => {
        console.log('post id', res)
        self.setData ({
          post: res.data
        })
      },
      (err) => {
        console.log('error', err)
      }
    )

    let Comments = new wx.BaaS.TableObject('comments_log_xhs')
    let query = new wx.BaaS.Query();
    query.compare('post_id', '=', options.id)
    Comments.setQuery(query).find().then(
      (res) => {
        self.setData({
          comments: res.data.objects
        })
      },
      (err) => {
        console.log('err', err)
      }
    )
  }
})
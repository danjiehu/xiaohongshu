// pages/show/show.js

const app = getApp()

Page({

  data: {
    currentUser: null,
    post: [],
    comments: [],
    likes: [],
    swiperList: [],
    activeSwiper: 0
    // indicatorDots: true,
    // vertical: false,
    // autoplay: false,
    // interval: 2000,
    // duration: 500
  },

  addComment(event) {
    console.log(event)
    const comment = event.detail.value.comment
    let Comments = new wx.BaaS.TableObject('comments_log_xhs')
    let newComment = Comments.create();
    newComment.set({
      content: comment,
      post_id: this.data.post.id,
      user_id: this.data.currentUser.id
    })
    newComment.save().then(
      (res) => {
        console.log('new comment saved', res)
        let commentArray = this.data.comments
        commentArray.push(res.data)
        this.setData({
          comments: commentArray
        })
      }
    )
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
        console.log(res.data)
        let gallery = res.data.gallery
        console.log('gallery', gallery)
       for (let i = 0; i < gallery.length; i +=1) {
        let imagePath = gallery[i].path
        let swiperList = self.data.swiperList
        swiperList.push(imagePath)
        console.log(self.data.swiperList)
        self.setData ({
          swiperList: this.data.swiperList
        })
        wx.setStorageSync('key', self.data.swiperList)
      }
      },
      (err) => {
        console.log('error', err)
      }
    )
  

    let Comments = new wx.BaaS.TableObject('comments_log_xhs')
    let query = new wx.BaaS.Query();
    query.compare('post_id', '=', options.id)
    Comments.expand('user_id').setQuery(query).find().then(
      (res) => {
        self.setData({
          comments: res.data.objects
        })
      },
      (err) => {
        console.log('err', err)
      }
    )
  },

  swiperChange(e){
    console.log("changed", e.detail.current)
    this.setData({
      activeSwiper: e.detail.current
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
  }
})
// pages/post/post.js
const app = getApp()

// start of page
Page({

  data: {
    userInfo: wx.getStorageSync('userInfo'),
    images: []
  },

  onLoad: function () {
   
  },

  submitPost: function(e) {
    console.log("submitPost",e)
  },

  // start of uploadImage function
  uploadImage: function(e){
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log("chooseImage",res)
        const tempFilePaths = res.tempFilePaths
        this.setData({
          images: tempFilePaths
        })
      }
    })
  },
  // end of uploadImage function

  // start of previewImage function
  preview(){
    wx.previewImage({
      urls: this.data.images,
    })
  }
  // end of previewImage function


// end of page
})
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

  // start of submitPost function
  submitPost: function(e) {

    console.log("submitPost",e)
    let page = this
    let images = page.data.images
    // let file = new wx.BaaS.File()
      // let fileParams = {filePath: page.data.images}
      // let metaData = {categoryName: "xhs"}
    let posts = new wx.BaaS.TableObject('posts_xhs')
    let newPost = posts.create()

    // start of upload image and getting iFanr link
    if (images) {
      images.forEach(
        (path) => {
          // start of defining uploadOneImage
          let uploadOneImage = function(tempFilePath){
            new Promise ((resolve, reject)=>{
              let File = new wx.BaaS.File()
              let fileParams = {filePath: tempFilePath}
              let metaData = {categoryName: 'xhs'}
              File.upload(fileParams, metaData).then(res => {
                console.log("upload success",res)
                let data = res.data 
                resolve(res.data.path)
              })
            })
          }
          // end of defining uploadOneImage

          uploadOneImage(path)
         
        }
      )}
    // end of upload image and getting iFanr link

    

  // end of submitPost function
  },
  
  // start of selectImage function
  selectImage: function(e){
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
  // end of selectImage function

  // start of previewImage function
  preview:function(){
    wx.previewImage({
      urls: this.data.images,
    })
  }
  // end of previewImage function


// end of page
})
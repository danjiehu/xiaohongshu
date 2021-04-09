// pages/post/post.js
const app = getApp()

// start of page
Page({

  data: {
    userInfo: wx.getStorageSync('userInfo'),
    images: [], // this is an array of tempt file path from wechat after user select the image
    // images_url: []
  },

  onLoad: function () {
   
  },

  // start of defining uploadOneImage
  // it uploads one temp file to iFanr and get the URL
  // it also pushes the new iFanr url to page data array
  uploadOneImage(tempFilePath){
    let page = this
    return new Promise ((resolve, reject)=>{
      let File = new wx.BaaS.File()
      let fileParams = {filePath: tempFilePath}
      let metaData = {categoryName: 'xhs'}
      File.upload(fileParams, metaData).then(res => {
        console.log("upload success",res)
        // let data = res.data 
        console.log("res.data.path", res.data.path)
        let url = res.data.path
        // page.data.images_url.push(url)
        resolve(url)
      })
    })
  },
  // end of defining uploadOneImage
  // uploadOneImage is a promise object that will resolve with one iFanr file url
  
  // start of defining uploadImages
  uploadImages(images){
    let page = this;
    let myPromise = new Promise((resolve, reject)=>{
      let image_urls = []
      images.forEach((tempFilePath, index) => {

        page.uploadOneImage(tempFilePath).then(res => {

            console.log("image_urlsBefore",image_urls)
            console.log("index-res",index,res,myPromise)
            image_urls.push(res)
            console.log("image_urlsAfter",image_urls)

            if(image_urls.length == images.length){
              resolve(image_urls)
              console.log("finalPromise",myPromise)
            }
        })
      })
    })
    return myPromise
  },
// end of defining uploadImages
// uploadImages is a promise object that will resolve with an array of iFanr urls


  // start of submitPost 
  submitPost(e) { 
    console.log("submitPost",e)
    let page = this
    let images = page.data.images
    page.uploadImages(images).then(res => {
      console.log("73",res)
      let posts = new wx.BaaS.TableObject('posts_xhs')
      let newPost = posts.create()
      // let image = `img_${res.length}`
      // let url = `res${res.length}`
      newPost.set({
        "title": e.detail.value.title,
        "description": e.detail.value.description,
        "gallery_url": res
      })
      newPost.save().then(res=>{console.log("saveSuccess",res)});
    })
  },
// end of submitPost 

   

    // if (images_url.length == 1) { 
      // page.uploadImages(images).then(images_url=>{
        // let posts = new wx.BaaS.TableObject('posts_xhs')
        // let newPost = posts.create()
        // newPost.set({
        //   "title": e.detail.value.title,
        //   "description": e.detail.value.description,
        //   "img_1": images_url[0],
        //   // "img_2": images_url[1],
        //   // "img_3": images_url[2],
        // })
        // review.save()}} },

   
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
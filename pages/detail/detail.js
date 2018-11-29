// pages/details/detail.js
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  onLoad(options) {
    this.setData({
      news_id: options.news_id
    })
    // console.log(this.data.news_id)
    this.getNewsContent(this.data.news_id)
  },

  onPullDownRefresh() {
    this.getNewsContent(this.data.news_id, () => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * API获取新闻内容
   */
  getNewsContent(idc, callback) {
    // console.log('getNewsContent', idc)
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: idc
      },
      success: res => {
        let result = res.data.result.content
        // console.log(result)
        this.setData({
          contents: result
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  onTapNaviBack(){
    wx.navigateBack()
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
